export default function AdminLoading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
        <h2 className="text-lg font-medium text-gray-900">Loading Admin Dashboard</h2>
        <p className="mt-1 text-sm text-gray-500">Please wait while we load your admin panel...</p>
      </div>
    </div>
  );
}
