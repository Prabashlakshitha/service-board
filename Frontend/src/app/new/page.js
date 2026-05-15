"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createJob } from "@/lib/api";
import toast from "react-hot-toast";
import { CheckCircle, XCircle } from "lucide-react";

const CATEGORIES = ["Plumbing", "Electrical", "Painting", "Joinery", "Other"];

const INITIAL = {
  title: "",
  description: "",
  category: "",
  location: "",
  contactName: "",
  contactEmail: "",
};


function validate(fields) {
  const errors = {};
  if (!fields.title.trim()) errors.title = "Title is required";
  else if (fields.title.trim().length < 5) errors.title = "Title must be at least 5 characters";
  if (!fields.description.trim()) errors.description = "Description is required";
  else if (fields.description.trim().length < 10) errors.description = "Description must be at least 10 characters";
  if (fields.contactEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.contactEmail)) {
    errors.contactEmail = "Please enter a valid email address";
  }
  return errors;
}

export default function NewJobPage() {
  const router = useRouter();
  const [fields, setFields] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
    // Clear field error on change
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fieldErrors = validate(fields);
    if (Object.keys(fieldErrors).length) {
      setErrors(fieldErrors);
      return;
    }
    setSubmitting(true);
    try {
      await createJob(fields);
      toast.success("Job posted successfully!", { icon: <CheckCircle size={20} color="#16a34a" /> });
      // Short delay so user sees the toast before redirect
      setTimeout(() => {
        router.push("/");
        router.refresh();
      }, 1500);
    } catch (err) {
      toast.error(err.message || "Something went wrong. Please try again.", { icon: <XCircle size={20} color="#dc2626" /> });
      setSubmitting(false);
    }
  };

  return (
    <div className="animate-fade-in" style={{ maxWidth: 620, margin: "0 auto" }}>
      {/* Header */}
      <div style={{ marginBottom: 36 }}>
        <a
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            fontSize: 13,
            color: "var(--col-text-muted)",
            textDecoration: "none",
            marginBottom: 20,
          }}
        >
          ← Back to board
        </a>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(24px, 3vw, 34px)",
            fontWeight: 400,
            letterSpacing: "-0.4px",
            marginBottom: 8,
          }}
        >
          Post a service request
        </h1>
        <p style={{ color: "var(--col-text-muted)", fontSize: 14 }}>
          Describe the work you need done and a tradesperson will get in touch.
        </p>
      </div>


      {/* Form */}
      <form
        onSubmit={handleSubmit}
        style={{
          background: "var(--col-surface)",
          border: "1px solid var(--col-border)",
          borderRadius: 14,
          padding: "32px",
          display: "flex",
          flexDirection: "column",
          gap: 22,
        }}
        noValidate
      >
        {/* Section: Job details */}
        <div>
          <p
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--col-accent)",
              marginBottom: 16,
            }}
          >
            Job Details
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {/* Title */}
            <div>
              <label className="form-label" htmlFor="title">
                Job title <span style={{ color: "#dc2626" }}>*</span>
              </label>
              <input
                id="title"
                name="title"
                className={`form-input${errors.title ? " error" : ""}`}
                placeholder="e.g. Leaking kitchen tap needs urgent repair"
                value={fields.title}
                onChange={handleChange}
                maxLength={200}
              />
              {errors.title && <p className="form-error">{errors.title}</p>}
            </div>

            {/* Description */}
            <div>
              <label className="form-label" htmlFor="description">
                Description <span style={{ color: "#dc2626" }}>*</span>
              </label>
              <textarea
                id="description"
                name="description"
                className={`form-input${errors.description ? " error" : ""}`}
                rows={5}
                placeholder="Describe the issue in detail — location in the house, urgency, any relevant measurements or context..."
                value={fields.description}
                onChange={handleChange}
                maxLength={2000}
                style={{ resize: "vertical", minHeight: 100 }}
              />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 4 }}>
                {errors.description
                  ? <p className="form-error">{errors.description}</p>
                  : <span />}
                <span style={{ fontSize: 11, color: "var(--col-text-muted)", fontFamily: "var(--font-mono)" }}>
                  {fields.description.length}/2000
                </span>
              </div>
            </div>

            {/* Category + Location row */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <div>
                <label className="form-label" htmlFor="category">Category</label>
                <select
                  id="category"
                  name="category"
                  className="form-input"
                  value={fields.category}
                  onChange={handleChange}
                >
                  <option value="">Select a trade...</option>
                  {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="form-label" htmlFor="location">Location</label>
                <input
                  id="location"
                  name="location"
                  className="form-input"
                  placeholder="e.g. Glasgow"
                  value={fields.location}
                  onChange={handleChange}
                  maxLength={100}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr style={{ border: "none", borderTop: "1px solid var(--col-border)" }} />

        {/* Section: Contact */}
        <div>
          <p
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--col-accent)",
              marginBottom: 16,
            }}
          >
            Contact details
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <div>
                <label className="form-label" htmlFor="contactName">Your name</label>
                <input
                  id="contactName"
                  name="contactName"
                  className="form-input"
                  placeholder="please enter name"
                  value={fields.contactName}
                  onChange={handleChange}
                  maxLength={100}
                />
              </div>
              <div>
                <label className="form-label" htmlFor="contactEmail">Email address</label>
                <input
                  id="contactEmail"
                  name="contactEmail"
                  type="email"
                  className={`form-input${errors.contactEmail ? " error" : ""}`}
                  placeholder="email@example.com"
                  value={fields.contactEmail}
                  onChange={handleChange}
                />
                {errors.contactEmail && <p className="form-error">{errors.contactEmail}</p>}
              </div>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 12, paddingTop: 4 }}>
          <a href="/" className="btn btn-secondary">Cancel</a>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={submitting}
            style={{ minWidth: 140 }}
          >
            {submitting ? "Posting…" : "Post job request"}
          </button>
        </div>
      </form>
    </div>
  );
}
