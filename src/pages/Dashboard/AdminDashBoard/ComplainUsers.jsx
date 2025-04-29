import { useEffect, useState } from "react";

const ComplainUsers = () => {
  const [complains, setComplains] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/userIssue")
      .then((res) => res.json())
      .then((data) => {
        setComplains(data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl font-semibold text-indigo-600">Loading...</div>
      </div>
    );
  }

  return (
    <section className="py-12 px-4 md:px-10 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">User Complaints</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {complains.map((complain) => (
          <div
            key={complain._id}
            className="bg-white shadow-md rounded-lg p-6 border border-gray-200 hover:shadow-lg transition duration-300"
          >
            <h3 className="text-xl font-semibold text-indigo-600 mb-2">{complain.issue.replace(/^\w/, (c) => c.toUpperCase())} Issue</h3>
            <p className="text-gray-700 mb-1">
              <span className="font-semibold">Name:</span> {complain.name}
            </p>
            <p className="text-gray-700 mb-1">
              <span className="font-semibold">Phone:</span> {complain.phone}
            </p>
            <p className="text-gray-700 mb-1">
              <span className="font-semibold">Email:</span> {complain.email}
            </p>
            <div className="mt-4">
              <p className="text-gray-600">
                <span className="font-semibold">Message:</span> {complain.message}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ComplainUsers;
