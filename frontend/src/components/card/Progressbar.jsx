// components/ProgressBar.js
export default function ProgressBar({ percentage }) {
    return (
      <div>
        <div className="flex justify-between text-sm text-gray-700 font-medium mb-1">
          <span>{`Rp.2.000.000,-`}</span>
          <span className="text-blue-600">{`${percentage}% Terpenuhi`}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>
    );
  }
  