import { useState, useEffect } from 'react';

const useGetApplications = (user: any, clubId: string | undefined) => {
    const [applied, setApplied] = useState(false);
    const [applying, setApplying] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!user || !clubId) return;

        fetch(`${import.meta.env.VITE_API_URL}/users/applications`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("user_token")}` },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data?.applications && Array.isArray(data.applications)) {
                    // Check if any application's _id matches the clubId
                    const hasApplied = data.applications.some((app: { _id: string; }) => app._id === clubId);
                    setApplied(hasApplied); // Mark as applied if found
                }
            })
            .catch((err) => {
                console.error("Error fetching applications:", err);
                setError('Failed to fetch applications');
            });
    }, [user, clubId]);

    const handleApply = async () => {
        if (!user) {
            alert("You need to be logged in to apply!");
            return;
        }

        setApplying(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/clubs/apply`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("user_token")}`,
                },
                body: JSON.stringify({ clubId }),
            });

            if (response.ok) {
                setApplied(true); // Immediately update UI
                alert("Application submitted successfully!");
            } else {
                const data = await response.json();
                alert(data.message || "Failed to apply. Please try again.");
            }
        } catch (err) {
            console.error("Error applying to club:", err);
            alert("Error applying to club. Please try again.");
        } finally {
            setApplying(false);
        }
    };

    return { applied, applying, handleApply, error };
};

export default useGetApplications;
