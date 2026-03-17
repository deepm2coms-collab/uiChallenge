import { useState, useEffect } from 'react';
import { Plus, MapPin, Video, Eye, Bell, Play, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { events, liveEvents } from '../mock-data';
import { Modal } from '../components/Modal';
import { cn } from '../utils/cn';

const categories = ['Townhall', 'Training', 'Celebration', 'CSR', 'Review'];
const categoryColor = { Townhall: 'bg-blue-100 text-blue-800', Training: 'bg-green-100 text-green-800', Celebration: 'bg-purple-100 text-purple-800', CSR: 'bg-amber-100 text-amber-800', Review: 'bg-slate-100 text-slate-800' };

export function EngagementCalendar() {
  const { currentCompany, userRole, addToast } = useApp();
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('monthly_grid');
  const [currentDate, setCurrentDate] = useState(new Date(2026, 2, 1));
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState([]);
  const [rsvps, setRsvps] = useState({});
  const [createOpen, setCreateOpen] = useState(false);
  const [liveJoinModal, setLiveJoinModal] = useState(null);
  const [recordingModal, setRecordingModal] = useState(null);
  const [scheduleLivestreamOpen, setScheduleLivestreamOpen] = useState(false);
  const [notifyMe, setNotifyMe] = useState({});

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  const filteredEvents = events.filter((e) => e.company === currentCompany && (categoryFilter.length === 0 || categoryFilter.includes(e.category)));
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  const today = new Date();
  const isToday = (d) => today.getDate() === d && today.getMonth() === currentDate.getMonth() && today.getFullYear() === currentDate.getFullYear();

  const getEventsForDay = (day) => {
    const d = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    return filteredEvents.filter((e) => e.date === d.toISOString().slice(0, 10));
  };

  const liveFiltered = liveEvents.filter((e) => e.company === currentCompany);
  const liveNow = liveFiltered.find((e) => e.status === 'live');
  const upcomingStreams = liveFiltered.filter((e) => e.status === 'upcoming');
  const pastRecordings = liveFiltered.filter((e) => e.status === 'ended' && e.recordingAvailable);

  const getCountdown = (scheduledAt) => {
    const then = new Date(scheduledAt);
    const now = new Date();
    const diff = then - now;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    if (hours < 0) return 'Started';
    if (hours < 24) return `Starts in ${hours} hours`;
    const days = Math.floor(hours / 24);
    return `Starts in ${days} days`;
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="h-10 w-48 bg-slate-200 rounded animate-pulse mb-6" />
        <div className="h-96 bg-slate-200 rounded-xl animate-pulse" />
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto page-enter">
      {liveFiltered.length > 0 && (
        <div className="space-y-6 mb-8">
          {liveNow && (
            <div className="relative rounded-2xl overflow-hidden border-2 border-red-500 shadow-lg">
              <img src={liveNow.thumbnailUrl} alt="" className="w-full h-48 object-cover opacity-90" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/40" />
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500 animate-ping" />
                <span className="px-2 py-0.5 rounded bg-red-500 text-white text-xs font-bold uppercase">LIVE</span>
              </div>
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                <div>
                  <h2 className="text-xl font-display font-bold text-white">{liveNow.title}</h2>
                  <div className="flex items-center gap-2 mt-1">
                    <img src={liveNow.host?.avatar} alt="" className="w-8 h-8 rounded-full border-2 border-white" />
                    <span className="text-white/90 text-sm">{liveNow.host?.name} · {liveNow.host?.role}</span>
                  </div>
                  <span className="flex items-center gap-1 text-white/80 text-sm mt-1"><Eye className="w-4 h-4" /> {liveNow.viewers} watching</span>
                </div>
                <button type="button" onClick={() => setLiveJoinModal(liveNow)} className="px-6 py-2.5 bg-[var(--brand-primary)] text-white rounded-lg font-semibold hover:opacity-90">Join Now</button>
              </div>
            </div>
          )}
          {upcomingStreams.length > 0 && (
            <div>
              <h2 className="text-lg font-display font-semibold text-slate-800 mb-3">Upcoming Streams</h2>
              <div className="flex gap-4 overflow-x-auto pb-2">
                {upcomingStreams.map((ev) => (
                  <div key={ev.id} className="min-w-[240px] bg-white rounded-xl border border-[var(--brand-border)] shadow-sm overflow-hidden">
                    <img src={ev.thumbnailUrl} alt="" className="w-full h-28 object-cover" />
                    <div className="p-3">
                      <p className="text-sm font-medium text-slate-900 line-clamp-2">{ev.title}</p>
                      <p className="text-xs text-slate-500 mt-1">{ev.host?.name}</p>
                      <p className="text-xs text-[var(--brand-primary)] font-medium mt-1">{getCountdown(ev.scheduledAt)}</p>
                      <button type="button" onClick={() => setNotifyMe((n) => ({ ...n, [ev.id]: !n[ev.id] }))} className={cn('mt-2 flex items-center gap-1 text-xs font-medium', notifyMe[ev.id] ? 'text-[var(--brand-primary)]' : 'text-slate-500')}><Bell className="w-3 h-3" /> {notifyMe[ev.id] ? 'Notified' : 'Notify Me'}</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {pastRecordings.length > 0 && (
            <div>
              <h2 className="text-lg font-display font-semibold text-slate-800 mb-3">Past Recordings</h2>
              <div className="flex gap-4 overflow-x-auto pb-2">
                {pastRecordings.map((ev) => (
                  <div key={ev.id} className="min-w-[200px] bg-white rounded-xl border border-[var(--brand-border)] shadow-sm overflow-hidden group">
                    <div className="relative aspect-video bg-slate-200">
                      <img src={ev.thumbnailUrl} alt="" className="w-full h-full object-cover" />
                      <button type="button" onClick={() => setRecordingModal(ev)} className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
                        <span className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-lg"><Play className="w-6 h-6 text-[var(--brand-primary)] ml-1" fill="currentColor" /></span>
                      </button>
                    </div>
                    <div className="p-3">
                      <p className="text-sm font-medium text-slate-900 line-clamp-2">{ev.title}</p>
                      <p className="text-xs text-slate-500">{ev.host?.name}</p>
                      <button type="button" onClick={() => setRecordingModal(ev)} className="mt-2 text-xs text-[var(--brand-primary)] font-medium">Watch Recording</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {(userRole === 'Admin' || userRole === 'Manager') && (
            <button type="button" onClick={() => setScheduleLivestreamOpen(true)} className="text-sm text-[var(--brand-primary)] font-medium">Schedule Livestream</button>
          )}
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h1 className="font-display font-bold text-2xl text-slate-900">Engagement Calendar</h1>
        <div className="flex items-center gap-2">
          {categories.map((c) => (
            <button key={c} type="button" onClick={() => setCategoryFilter((f) => f.includes(c) ? f.filter((x) => x !== c) : [...f, c])} className={cn('px-3 py-1.5 rounded-lg text-sm', categoryFilter.includes(c) ? categoryColor[c] : 'bg-slate-100 text-slate-600')}>{c}</button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          {[['Monthly Grid', 'monthly_grid'], ['Weekly', 'weekly'], ['List', 'list']].map(([label, val]) => (
            <button key={val} type="button" onClick={() => setView(val)} className={cn('px-3 py-2 rounded-lg text-sm', view === val ? 'bg-[var(--brand-primary)] text-white' : 'bg-slate-100 text-slate-600')}>{label}</button>
          ))}
          {(userRole === 'Admin' || userRole === 'Manager') && (
            <button type="button" onClick={() => setCreateOpen(true)} className="w-14 h-14 rounded-full bg-[var(--brand-primary)] text-white flex items-center justify-center shadow-lg hover:opacity-90 fixed bottom-6 right-6 z-50">
              <Plus className="w-6 h-6" />
            </button>
          )}
        </div>
      </div>

      {view === 'monthly_grid' && (
        <>
          <div className="flex items-center justify-between mb-4">
            <button type="button" onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))} className="p-2 rounded-lg hover:bg-slate-100">←</button>
            <h2 className="font-display font-semibold text-lg">{currentDate.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}</h2>
            <button type="button" onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))} className="p-2 rounded-lg hover:bg-slate-100">→</button>
          </div>
          <div className="grid grid-cols-7 gap-1 bg-white rounded-xl border border-[var(--brand-border)] shadow-sm p-4">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
              <div key={d} className="text-center text-xs font-medium text-slate-500 py-2">{d}</div>
            ))}
            {Array.from({ length: firstDay }).map((_, i) => (
              <div key={`empty-${i}`} className="aspect-square" />
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const dayEvents = getEventsForDay(day);
              return (
                <div
                  key={day}
                  onClick={() => { setSelectedDay(day); }}
                  className={cn('aspect-square rounded-lg border p-1 cursor-pointer hover:bg-slate-50', isToday(day) && 'bg-[var(--brand-primary)] text-white')}
                >
                  <span className="text-sm font-medium">{day}</span>
                  {dayEvents.slice(0, 2).map((ev) => (
                    <div key={ev.id} onClick={(e) => { e.stopPropagation(); setSelectedEvent(ev); }} className="text-xs truncate mt-0.5 rounded px-1 py-0.5 bg-slate-100">{ev.title.slice(0, 12)}</div>
                  ))}
                  {dayEvents.length > 2 && <span className="text-xs text-slate-500">+{dayEvents.length - 2}</span>}
                </div>
              );
            })}
          </div>
        </>
      )}

      {view === 'list' && (
        <div className="space-y-2">
          {filteredEvents.map((ev) => (
            <div key={ev.id} className="flex items-center gap-4 p-4 bg-white rounded-xl border border-[var(--brand-border)] shadow-sm">
              <div className="w-14 h-14 rounded-lg bg-slate-100 flex flex-col items-center justify-center shrink-0">
                <span className="text-xs">{new Date(ev.date).toLocaleDateString('en-GB', { month: 'short' })}</span>
                <span className="text-lg font-mono font-semibold">{new Date(ev.date).getDate()}</span>
              </div>
              <span className={cn('text-xs font-medium px-2 py-0.5 rounded shrink-0', categoryColor[ev.category])}>{ev.category}</span>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-slate-900">{ev.title}</p>
                <p className="text-sm text-slate-500">{ev.time} · {ev.location}</p>
              </div>
              <button type="button" onClick={() => setSelectedEvent(ev)} className="px-3 py-1.5 border border-[var(--brand-primary)] text-[var(--brand-primary)] rounded-lg text-sm">View</button>
            </div>
          ))}
        </div>
      )}

      {selectedDay && (
        <div className="fixed right-0 top-0 bottom-0 w-72 bg-white border-l shadow-xl p-4 z-40">
          <h3 className="font-semibold text-slate-900 mb-2">Events on {selectedDay} {currentDate.toLocaleDateString('en-GB', { month: 'short' })}</h3>
          {getEventsForDay(selectedDay).map((ev) => (
            <div key={ev.id} className="p-3 rounded-lg bg-slate-50 mb-2 cursor-pointer" onClick={() => setSelectedEvent(ev)}>
              <p className="font-medium text-slate-800">{ev.title}</p>
              <p className="text-xs text-slate-500">{ev.time}</p>
            </div>
          ))}
          <button type="button" onClick={() => setSelectedDay(null)} className="mt-4 text-sm text-slate-500">Close</button>
        </div>
      )}

      <Modal isOpen={!!selectedEvent} onClose={() => setSelectedEvent(null)} title={selectedEvent?.title}>
        {selectedEvent && (
          <div className="space-y-4">
            <span className={cn('text-xs font-medium px-2 py-0.5 rounded', categoryColor[selectedEvent.category])}>{selectedEvent.category}</span>
            <p className="text-slate-600">{selectedEvent.description || 'Event details.'}</p>
            <p className="text-sm text-slate-600">{selectedEvent.date} · {selectedEvent.time}</p>
            <p className="text-sm text-slate-600 flex items-center gap-1">{selectedEvent.online ? <Video className="w-4 h-4" /> : <MapPin className="w-4 h-4" />} {selectedEvent.location}</p>
            <div className="flex gap-2">
              <button type="button" className="flex-1 py-2 rounded-lg bg-green-500 text-white font-medium text-sm">✓ Going</button>
              <button type="button" className="flex-1 py-2 rounded-lg border border-slate-200 text-slate-600 text-sm">? Maybe</button>
              <button type="button" className="flex-1 py-2 rounded-lg bg-red-500 text-white text-sm">Can't Go</button>
            </div>
            <button type="button" onClick={() => addToast({ type: 'success', message: 'Added to your calendar!', actorName: null, actorAvatar: null })} className="w-full py-2 border border-[var(--brand-primary)] text-[var(--brand-primary)] rounded-lg text-sm">Add to My Calendar</button>
          </div>
        )}
      </Modal>

      <Modal isOpen={createOpen} onClose={() => setCreateOpen(false)} title="Create Event">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Title *</label>
            <input type="text" className="w-full rounded-lg border border-slate-200 p-2" placeholder="Event title" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
            <textarea className="w-full rounded-lg border border-slate-200 p-2 min-h-[80px]" placeholder="Description" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
            <div className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <button key={c} type="button" className={cn('px-3 py-1.5 rounded-lg text-sm', 'bg-slate-100 text-slate-600')}>{c}</button>
              ))}
            </div>
          </div>
          <button type="button" onClick={() => { setCreateOpen(false); addToast({ type: 'success', message: 'Event created and team notified ✓', actorName: null, actorAvatar: null }); }} className="w-full py-2 bg-[var(--brand-primary)] text-white rounded-lg font-medium">Create Event</button>
        </div>
      </Modal>

      <Modal isOpen={!!liveJoinModal} onClose={() => setLiveJoinModal(null)} title={liveJoinModal?.title} className="max-w-4xl">
        {liveJoinModal && (
          <div className="flex gap-4">
            <div className="flex-1 aspect-video bg-black rounded-xl overflow-hidden">
              <img src={liveJoinModal.thumbnailUrl} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="w-72 flex flex-col">
              <div className="flex items-center gap-2 text-sm text-slate-600 mb-2"><Eye className="w-4 h-4" /> {liveJoinModal.viewers} watching</div>
              <div className="flex-1 rounded-lg border border-slate-200 p-2 bg-slate-50 max-h-48 overflow-y-auto space-y-2">
                <p className="text-xs text-slate-500">Rahul: Great session!</p>
                <p className="text-xs text-slate-500">Sneha: Thanks for the update</p>
                <p className="text-xs text-slate-500">Priya: When is the next one?</p>
              </div>
              <input type="text" placeholder="Type a message..." className="mt-2 rounded-lg border border-slate-200 p-2 text-sm" />
            </div>
          </div>
        )}
      </Modal>

      <Modal isOpen={!!recordingModal} onClose={() => setRecordingModal(null)} title={recordingModal?.title} className="max-w-4xl">
        {recordingModal && (
          <div className="aspect-video bg-black rounded-xl overflow-hidden">
            <iframe title="Recording" src="https://www.youtube.com/embed/dQw4w9WgXcQ" className="w-full h-full" allowFullScreen />
          </div>
        )}
      </Modal>

      <Modal isOpen={scheduleLivestreamOpen} onClose={() => setScheduleLivestreamOpen(false)} title="Schedule Livestream">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
            <input type="text" className="w-full rounded-lg border border-slate-200 p-2" placeholder="Livestream title" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
            <select className="w-full rounded-lg border border-slate-200 p-2">
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Scheduled Date & Time</label>
            <input type="datetime-local" className="w-full rounded-lg border border-slate-200 p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Thumbnail URL</label>
            <input type="url" className="w-full rounded-lg border border-slate-200 p-2" placeholder="https://..." />
          </div>
          <button type="button" onClick={() => { setScheduleLivestreamOpen(false); addToast({ type: 'success', message: 'Livestream scheduled', actorName: null, actorAvatar: null }); }} className="w-full py-2 bg-[var(--brand-primary)] text-white rounded-lg font-medium">Schedule</button>
        </div>
      </Modal>
    </div>
  );
}
