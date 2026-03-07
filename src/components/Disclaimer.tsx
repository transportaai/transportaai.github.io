import { ShieldAlert } from 'lucide-react';

export default function Disclaimer() {
  return (
    <div className="w-full bg-gray-50 border-t border-gray-200 py-6">
      <div className="container-custom px-4 sm:px-6 lg:px-8">
        <div className="flex items-start gap-3 max-w-4xl mx-auto">
          <ShieldAlert className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-gray-500 leading-relaxed">
            <span className="font-semibold text-gray-600">Disclaimer: </span>
            This content is produced in a personal capacity and is not affiliated with any organization. The views expressed are solely those of the author and do not necessarily reflect the official positions of any institution or employer.
          </p>
        </div>
      </div>
    </div>
  );
}
