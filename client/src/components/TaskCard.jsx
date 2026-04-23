import { CheckCircle2, Circle, Trash2, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const TaskCard = ({ task, onToggleStatus, onDelete }) => {
  const isCompleted = task.status === 'Completed';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className={`p-4 rounded-xl border transition-all duration-200 ${
        isCompleted 
          ? 'bg-slate-50 border-slate-200 opacity-75' 
          : 'bg-white border-slate-200 shadow-sm hover:shadow-md'
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3 flex-grow">
          <button
            onClick={() => onToggleStatus(task.id, isCompleted ? 'Pending' : 'Completed')}
            className={`mt-1 transition-colors ${
              isCompleted ? 'text-green-500' : 'text-slate-300 hover:text-primary-500'
            }`}
          >
            {isCompleted ? (
              <CheckCircle2 className="w-5 h-5 fill-current" />
            ) : (
              <Circle className="w-5 h-5" />
            )}
          </button>
          
          <div className="flex-grow">
            <h3 className={`font-semibold text-slate-900 ${isCompleted ? 'line-through text-slate-400' : ''}`}>
              {task.title}
            </h3>
            {task.description && (
              <p className={`text-sm mt-1 ${isCompleted ? 'text-slate-400' : 'text-slate-600'}`}>
                {task.description}
              </p>
            )}
            <div className="flex items-center gap-3 mt-3">
              <div className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider text-slate-400">
                <Clock className="w-3 h-3" />
                {new Date(task.createdAt).toLocaleDateString()}
              </div>
              
              <button
                onClick={() => onToggleStatus(task.id, isCompleted ? 'Pending' : 'Completed')}
                className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-tighter transition-all ${
                  isCompleted 
                    ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                    : 'bg-amber-100 text-amber-700 hover:bg-amber-200'
                }`}
              >
                {task.status}
              </button>
            </div>
          </div>
        </div>

        <button
          onClick={() => onDelete(task.id)}
          className="text-slate-300 hover:text-red-500 transition-colors p-1"
          title="Delete Task"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
};

export default TaskCard;
