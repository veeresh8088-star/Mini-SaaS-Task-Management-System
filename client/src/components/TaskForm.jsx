import { useState } from 'react';
import { Plus, X, Loader2 } from 'lucide-react';

const TaskForm = ({ onSubmit, isLoading }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Pending');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    
    const success = await onSubmit({ title, description, status });
    if (success) {
      setTitle('');
      setDescription('');
      setStatus('Pending');
      setIsOpen(false);
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="w-full py-4 border-2 border-dashed border-slate-200 rounded-xl text-slate-400 hover:text-primary-600 hover:border-primary-200 hover:bg-primary-50 transition-all duration-200 flex items-center justify-center gap-2 font-medium"
      >
        <Plus className="w-5 h-5" />
        Add New Task
      </button>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl border border-primary-100 shadow-lg relative overflow-hidden">
      <div className="absolute top-0 left-0 w-1 h-full bg-primary-500"></div>
      
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-slate-900">New Task</h3>
        <button 
          onClick={() => setIsOpen(false)}
          className="text-slate-400 hover:text-slate-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            autoFocus
            required
            className="input-field"
            placeholder="What needs to be done?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <textarea
            className="input-field min-h-[100px] resize-none"
            placeholder="Add some details (optional)..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        <div className="flex items-center gap-4 py-2">
          <span className="text-sm font-medium text-slate-500 uppercase tracking-wider">Initial Status:</span>
          <div className="flex bg-slate-100 p-1 rounded-lg">
            {['Pending', 'Completed'].map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setStatus(s)}
                className={`px-3 py-1 rounded-md text-xs font-bold transition-all duration-200 ${
                  status === s 
                    ? 'bg-white text-primary-600 shadow-sm' 
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="px-4 py-2 text-slate-600 font-medium hover:bg-slate-100 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading || !title.trim()}
            className="btn-primary flex items-center gap-2"
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
            Create Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
