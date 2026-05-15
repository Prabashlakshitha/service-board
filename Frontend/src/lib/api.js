const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

async function apiFetch(path, options = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  const data = await res.json();
  if (!res.ok) {
    const message =
      data?.errors?.[0]?.message || data?.message || "An error occurred";
    const error = new Error(message);
    error.status = res.status;
    error.errors = data?.errors || [];
    throw error;
  }
  return data;
}

export async function getJobs(params = {}) {
  const filtered = Object.fromEntries(
    Object.entries(params).filter(([, v]) => v && v !== "All" && v !== "")
  );
  const qs = new URLSearchParams(filtered).toString();
  const res = await apiFetch(`/api/jobs${qs ? `?${qs}` : ""}`);
  return res.data;
}

export async function getJob(id) {
  const res = await apiFetch(`/api/jobs/${id}`);
  return res.data;
}

export async function createJob(body) {
  const res = await apiFetch("/api/jobs", {
    method: "POST",
    body: JSON.stringify(body),
  });
  return res.data;
}

export async function updateJobStatus(id, status) {
  const res = await apiFetch(`/api/jobs/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
  return res.data;
}

export async function deleteJob(id) {
  await apiFetch(`/api/jobs/${id}`, { method: "DELETE" });
}
