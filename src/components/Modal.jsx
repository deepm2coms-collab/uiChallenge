import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { cn } from '../utils/cn';

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  className,
  showClose = true,
  closeOnBackdrop = true,
}) {
  useEffect(() => {
    if (!isOpen) return;
    const handleEscape = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const content = (
    <div
      className="fixed inset-0 z-[150] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
    >
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-200 opacity-100"
        onClick={closeOnBackdrop ? onClose : undefined}
        aria-hidden="true"
      />
      <div
        className={cn(
          'relative bg-white rounded-2xl shadow-2xl max-h-[90vh] overflow-auto modal-enter',
          className
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {showClose && (
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-1 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-700 z-10"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        )}
        {title && (
          <h2 id="modal-title" className="text-xl font-display font-semibold text-slate-900 pt-6 px-6 pb-2 pr-12">
            {title}
          </h2>
        )}
        <div className={title ? 'px-6 pb-6' : 'p-6'}>{children}</div>
      </div>
    </div>
  );

  return createPortal(content, document.body);
}
