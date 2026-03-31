import { useState, useRef } from "react";
import "./StudentPortal.css";

/* ─── Reusable Primitives ───────────────────────────────────────────────────── */
const Field = ({ label, required, children }) => (
  <div className="sp-field">
    <label className="sp-label">
      {label}
      {required && <span className="sp-req"> *</span>}
    </label>
    {children}
  </div>
);

const Input = (props) => <input className="sp-input" {...props} />;

const Sel = ({ children, ...props }) => (
  <div className="sp-select-wrap">
    <select className="sp-select" {...props}>{children}</select>
    <span className="sp-select-arrow">▾</span>
  </div>
);

const SectionHeader = ({ icon, title, action }) => (
  <div className="sp-section-header">
    <div className="sp-section-title">
      {icon && <span className="sp-section-icon">{icon}</span>}
      <h3>{title}</h3>
    </div>
    {action}
  </div>
);

const RadioGroup = ({ options, value, onChange, name }) => (
  <div className="sp-radio-group">
    {options.map((o) => (
      <label key={o.value} className={`sp-radio-label ${value === o.value ? "active" : ""}`}>
        <input
          type="radio"
          name={name}
          value={o.value}
          checked={value === o.value}
          onChange={() => onChange(o.value)}
        />
        {o.label}
      </label>
    ))}
  </div>
);

/* ════════════════════════════════════════════════════════════════════════════
   STUDENT DETAILS — Step Config & Steps
════════════════════════════════════════════════════════════════════════════ */
const STUDENT_STEPS = [
  { id: 1, label: "Personal, Contact & Identity", sub: "Basic info, address & passport" },
  { id: 2, label: "Education", sub: "Academic background" },
  { id: 3, label: "Background", sub: "Goals, visa & history" },
  { id: 4, label: "Documents", sub: "Upload required files" },
  { id: 5, label: "Application", sub: "Create & review" },
];

/* ─── Student Step 1: Personal, Contact & Identity ─────────────────────────── */
const StepPersonal = ({ data, setData }) => {
  const set = (k) => (e) => setData({ ...data, [k]: e.target.value });

  return (
    <div className="sp-step-content">
      <div className="sp-step-intro">
        <h2>Personal Information</h2>
        <p>Start with the student's basic personal details. Fields marked <span className="sp-req">*</span> are required.</p>
      </div>

      <div className="sp-card">
        <SectionHeader icon="👤" title="Basic Details" />
        <div className="sp-grid-2">
          <Field label="First Name" required>
            <Input placeholder="Enter first name" value={data.firstName || ""} onChange={set("firstName")} />
          </Field>
          <Field label="Last Name">
            <Input placeholder="Enter last name" value={data.lastName || ""} onChange={set("lastName")} />
          </Field>
          <Field label="Email Address" required>
            <Input type="email" placeholder="student@email.com" value={data.email || ""} onChange={set("email")} />
          </Field>
          <Field label="Date of Birth" required>
            <Input type="date" value={data.dob || ""} onChange={set("dob")} />
          </Field>
        </div>
        <div className="sp-grid-3" style={{ marginTop: "1.25rem" }}>
          <Field label="Gender" required>
            <Sel value={data.gender || ""} onChange={set("gender")}>
              <option value="">Select gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Non-binary</option>
              <option>Prefer not to say</option>
            </Sel>
          </Field>
          <Field label="Marital Status" required>
            <Sel value={data.marital || ""} onChange={set("marital")}>
              <option value="">Select status</option>
              <option>Single</option>
              <option>Married</option>
              <option>Divorced</option>
              <option>Widowed</option>
            </Sel>
          </Field>
          <Field label="Nationality" required>
            <Sel value={data.nationality || ""} onChange={set("nationality")}>
              <option value="">Select nationality</option>
              <option>Indian</option>
              <option>Pakistani</option>
              <option>Bangladeshi</option>
              <option>Nepali</option>
              <option>Sri Lankan</option>
              <option>Nigerian</option>
              <option>Other</option>
            </Sel>
          </Field>
        </div>
      </div>

      <div className="sp-card">
        <SectionHeader icon="🏢" title="Consultant Assignment" />
        <div className="sp-grid-2">
          <Field label="App Owner / Assigned Consultant" required>
            <Sel value={data.owner || ""} onChange={set("owner")}>
              <option value="">Select consultant</option>
              <option>Raju Rama (You)</option>
              <option>Priya Shah</option>
              <option>Ahmed Khan</option>
            </Sel>
          </Field>
        </div>
      </div>

      <div className="sp-step-intro" style={{ marginTop: "2rem" }}>
        <h2>Contact & Address</h2>
        <p>Student's contact numbers and current residential address.</p>
      </div>

      <div className="sp-card">
        <SectionHeader icon="📞" title="Contact Numbers" />
        <div className="sp-grid-2">
          <Field label="Primary Phone" required>
            <div className="sp-phone-row">
              <Sel value={data.phoneCode || ""} onChange={set("phoneCode")} style={{ width: "120px", flexShrink: 0 }}>
                <option value="">+Code</option>
                <option value="+91">🇮🇳 +91</option>
                <option value="+92">🇵🇰 +92</option>
                <option value="+880">🇧🇩 +880</option>
                <option value="+977">🇳🇵 +977</option>
                <option value="+1">🇺🇸 +1</option>
                <option value="+44">🇬🇧 +44</option>
                <option value="+61">🇦🇺 +61</option>
              </Sel>
              <Input placeholder="Phone number" value={data.phone || ""} onChange={set("phone")} style={{ flex: 1 }} />
            </div>
          </Field>
          <Field label="WhatsApp Number">
            <div className="sp-phone-row">
              <Sel value={data.waCode || ""} onChange={set("waCode")} style={{ width: "120px", flexShrink: 0 }}>
                <option value="">+Code</option>
                <option value="+91">🇮🇳 +91</option>
                <option value="+92">🇵🇰 +92</option>
                <option value="+880">🇧🇩 +880</option>
                <option value="+977">🇳🇵 +977</option>
                <option value="+1">🇺🇸 +1</option>
                <option value="+44">🇬🇧 +44</option>
              </Sel>
              <Input placeholder="WhatsApp number" value={data.whatsapp || ""} onChange={set("whatsapp")} style={{ flex: 1 }} />
            </div>
          </Field>
          <Field label="Alternate Email">
            <Input type="email" placeholder="Alternate email (optional)" value={data.altEmail || ""} onChange={set("altEmail")} />
          </Field>
        </div>
      </div>

      <div className="sp-card">
        <SectionHeader icon="🏠" title="Current Address" />
        <div className="sp-grid-1">
          <Field label="Address Line 1" required>
            <Input placeholder="Street address, apartment, suite" value={data.address1 || ""} onChange={set("address1")} />
          </Field>
          <Field label="Address Line 2">
            <Input placeholder="Landmark, locality (optional)" value={data.address2 || ""} onChange={set("address2")} />
          </Field>
        </div>
        <div className="sp-grid-3" style={{ marginTop: "1.25rem" }}>
          <Field label="Country" required>
            <Sel value={data.country || ""} onChange={set("country")}>
              <option value="">Select country</option>
              <option>India</option>
              <option>Pakistan</option>
              <option>Bangladesh</option>
              <option>Nepal</option>
              <option>Nigeria</option>
              <option>Other</option>
            </Sel>
          </Field>
          <Field label="State / Region" required>
            <Sel value={data.state || ""} onChange={set("state")}>
              <option value="">Select state</option>
              <option>Telangana</option>
              <option>Maharashtra</option>
              <option>Karnataka</option>
              <option>Delhi</option>
              <option>Other</option>
            </Sel>
          </Field>
          <Field label="City" required>
            <Sel value={data.city || ""} onChange={set("city")}>
              <option value="">Select city</option>
              <option>Hyderabad</option>
              <option>Mumbai</option>
              <option>Bangalore</option>
              <option>Chennai</option>
              <option>Other</option>
            </Sel>
          </Field>
        </div>
        <div className="sp-grid-2" style={{ marginTop: "1.25rem" }}>
          <Field label="Postal / ZIP Code" required>
            <Input placeholder="Postal code" value={data.postal || ""} onChange={set("postal")} />
          </Field>
        </div>
      </div>

      <div className="sp-step-intro" style={{ marginTop: "2rem" }}>
        <h2>Passport & Identity</h2>
        <p>Travel document details for visa and application processing.</p>
      </div>

      <div className="sp-card">
        <SectionHeader title="Passport Details" />
        <div className="sp-grid-2">
          <Field label="Passport Number" required>
            <Input placeholder="e.g. A1234567" value={data.passportNo || ""} onChange={set("passportNo")} />
          </Field>
          <Field label="Country of Issue" required>
            <Sel value={data.passportCountry || ""} onChange={set("passportCountry")}>
              <option value="">Select country</option>
              <option>India</option>
              <option>Pakistan</option>
              <option>Bangladesh</option>
              <option>Nepal</option>
              <option>Nigeria</option>
            </Sel>
          </Field>
          <Field label="Passport Issue Date" required>
            <Input type="date" value={data.passportStart || ""} onChange={set("passportStart")} />
          </Field>
          <Field label="Passport Expiry Date" required>
            <Input type="date" value={data.passportEnd || ""} onChange={set("passportEnd")} />
          </Field>
        </div>
        <div className="sp-info-box">
          ℹ️ Ensure passport has at least <strong>6 months validity</strong> from the intended study start date.
        </div>
      </div>

      {/*<div className="sp-card">
        <SectionHeader icon="🪪" title="Additional Identity" />
        <div className="sp-grid-2">
          <Field label="National ID / Aadhaar / CNIC">
            <Input placeholder="National ID number (optional)" value={data.nationalId || ""} onChange={set("nationalId")} />
          </Field>
          <Field label="Date of Issue">
            <Input type="date" value={data.idIssue || ""} onChange={set("idIssue")} />
          </Field>
        </div>
      </div>*/}
    </div>
  );
};

/* ─── Student Step 2: Education ─────────────────────────────────────────────── */
const StepEducation = ({ data, setData }) => {
  const set = (k) => (e) => setData({ ...data, [k]: e.target.value });
  const quals = data.qualifications || [];
  const [cq, setCq] = useState({ scoreType: "Percentage" });
  const setQ = (k) => (e) => setCq({ ...cq, [k]: e.target.value });
  const testTypes = ["IELTS", "TOEFL", "PTE", "Duolingo", "SAT", "GRE", "GMAT", "Other"];

  const saveQual = () => {
    if (cq.eduLevel && cq.boardCountry) {
      setData({ ...data, qualifications: [...quals, { ...cq, id: Date.now() }] });
      setCq({ scoreType: "Percentage" });
    } else {
      alert("Please fill Education Level & Country first.");
    }
  };

  return (
    <div className="sp-step-content">
      <div className="sp-step-intro">
        <h2>Education Background</h2>
        <p>Academic history, proficiency scores and work experience.</p>
      </div>

      {quals.length > 0 && (
        <div className="sp-apps-list">
          {quals.map((q, i) => (
            <div key={q.id} className="sp-app-chip">
              <span className="sp-app-num">Qual #{i + 1}</span>
              <span className="sp-app-name">{q.eduLevel}</span>
              <span className="sp-app-course">{q.courseName || q.boardName}</span>
              <span className="sp-app-intake">{q.score ? `${q.score} ${q.scoreType}` : ""}</span>
              <button className="sp-doc-remove" onClick={() => setData({ ...data, qualifications: quals.filter((x) => x.id !== q.id) })}>✕</button>
            </div>
          ))}
        </div>
      )}

      <div className="sp-card">
        <SectionHeader icon="🎓" title="Academic Qualification" action={
          <button className="sp-btn-secondary" onClick={saveQual}>+ Add Qualification</button>
        } />
        <div className="sp-grid-2">
          <Field label="Education Level" required>
            <Sel value={cq.eduLevel || ""} onChange={setQ("eduLevel")}>
              <option value="">Select level</option>
              <option>High School (10th)</option>
              <option>Senior Secondary (12th)</option>
              <option>Diploma</option>
              <option>Bachelor's Degree</option>
              <option>Master's Degree</option>
              <option>PhD</option>
            </Sel>
          </Field>
          <Field label="Board / University Country" required>
            <Sel value={cq.boardCountry || ""} onChange={setQ("boardCountry")}>
              <option value="">Select country</option>
              <option>India</option>
              <option>Pakistan</option>
              <option>Bangladesh</option>
              <option>Nepal</option>
              <option>Other</option>
            </Sel>
          </Field>
          <Field label="Board / University Name" required>
            <Input placeholder="e.g. CBSE, Osmania University" value={cq.boardName || ""} onChange={setQ("boardName")} />
          </Field>
          <Field label="Course / Degree Name">
            <Input placeholder="e.g. B.Tech Computer Science" value={cq.courseName || ""} onChange={setQ("courseName")} />
          </Field>
          <Field label="Start Date">
            <Input type="date" value={cq.eduStart || ""} onChange={setQ("eduStart")} />
          </Field>
          <Field label="End Date">
            <Input type="date" value={cq.eduEnd || ""} onChange={setQ("eduEnd")} disabled={cq.pursuing} />
          </Field>
        </div>
        <div className="sp-score-section">
          <label className="sp-label">Score Type <span className="sp-req">*</span></label>
          <div className="sp-score-tabs">
            {["Percentage", "Grade", "GPA", "Other"].map((t) => (
              <button key={t} className={`sp-score-tab ${cq.scoreType === t ? "active" : ""}`} onClick={() => setCq({ ...cq, scoreType: t })}>{t}</button>
            ))}
          </div>
          <Input placeholder={`Enter ${cq.scoreType}`} value={cq.score || ""} onChange={setQ("score")} style={{ marginTop: "0.75rem" }} />
        </div>
      </div>

      <div className="sp-card">
        <SectionHeader icon="📊" title="Proficiency Test Scores" />
        <div className="sp-yesno-toggle">
          <span>Does the student have proficiency test scores?</span>
          <RadioGroup name="hasTest" options={[{ value: "yes", label: "Yes" }, { value: "no", label: "No" }]} value={data.hasTest || "no"} onChange={(v) => setData({ ...data, hasTest: v })} />
        </div>
        {data.hasTest === "yes" && (
          <div className="sp-grid-2" style={{ marginTop: "1.25rem" }}>
            <Field label="Test Type" required>
              <Sel value={data.testType || ""} onChange={set("testType")}>
                <option value="">Select test</option>
                {testTypes.map((t) => <option key={t}>{t}</option>)}
              </Sel>
            </Field>
            <Field label="Test Date" required>
              <Input type="date" value={data.testDate || ""} onChange={set("testDate")} />
            </Field>
            <Field label="Overall Score" required>
              <Input placeholder="e.g. 7.5 / 110" value={data.testScore || ""} onChange={set("testScore")} />
            </Field>
            <Field label="Listening">
              <Input placeholder="Listening score" value={data.testListen || ""} onChange={set("testListen")} />
            </Field>
            <Field label="Reading">
              <Input placeholder="Reading score" value={data.testRead || ""} onChange={set("testRead")} />
            </Field>
            <Field label="Writing">
              <Input placeholder="Writing score" value={data.testWrite || ""} onChange={set("testWrite")} />
            </Field>
          </div>
        )}
      </div>

      <div className="sp-card">
        <SectionHeader icon="💼" title="Work Experience" />
        <div className="sp-yesno-toggle">
          <span>Does the student have work experience?</span>
          <RadioGroup name="hasWork" options={[{ value: "yes", label: "Yes" }, { value: "no", label: "No" }]} value={data.hasWork || "no"} onChange={(v) => setData({ ...data, hasWork: v })} />
        </div>
        {data.hasWork === "yes" && (
          <div className="sp-grid-2" style={{ marginTop: "1.25rem" }}>
            <Field label="Company Name" required>
              <Input placeholder="Employer / company name" value={data.company || ""} onChange={set("company")} />
            </Field>
            <Field label="Job Title" required>
              <Input placeholder="e.g. Software Engineer" value={data.jobTitle || ""} onChange={set("jobTitle")} />
            </Field>
            <Field label="From Date">
              <Input type="date" value={data.workFrom || ""} onChange={set("workFrom")} />
            </Field>
            <Field label="To Date">
              <Input type="date" value={data.workTo || ""} onChange={set("workTo")} />
            </Field>
          </div>
        )}
      </div>
    </div>
  );
};

/* ─── Student Step 3: Background & Visa History ────────────────────────────── */
const StepBackground = ({ data, setData }) => {
  const set = (k) => (e) => setData({ ...data, [k]: e.target.value });
  const radio = (k) => (v) => setData({ ...data, [k]: v });

  // Generic structured entry form for Visa Refusal / Visa History
  const VisaEntryForm = ({ field, listField }) => {
    const entries = data[listField] || [];
    const [current, setCurrent] = useState({ visaCategory: "", country: "", date: "", description: "" });
    const setC = (k) => (e) => setCurrent({ ...current, [k]: e.target.value });

    const save = () => {
      if (current.visaCategory || current.country || current.date) {
        setData({ ...data, [listField]: [...entries, { ...current, id: Date.now() }] });
        setCurrent({ visaCategory: "", country: "", date: "", description: "" });
      }
    };
    const remove = (id) => setData({ ...data, [listField]: entries.filter((e) => e.id !== id) });

    if (data[field] !== "yes") return null;
    return (
      <div style={{ marginTop: "0.75rem" }}>
        {entries.map((e, i) => (
          <div key={e.id} className="sp-app-chip" style={{ marginBottom: "0.5rem" }}>
            <span className="sp-app-num">#{i + 1}</span>
            <span className="sp-app-name">{e.visaCategory}</span>
            <span className="sp-app-course">{e.country}</span>
            <span className="sp-app-intake">{e.date}</span>
            <button className="sp-doc-remove" onClick={() => remove(e.id)}>✕</button>
          </div>
        ))}
        <div className="sp-visa-entry-form">
          <div className="sp-grid-2" style={{ marginBottom: "0.75rem" }}>
            <Field label="Visa Type" required>
              <Sel value={current.visaCategory} onChange={setC("visaCategory")}>
                <option value="">Select Visa Category</option>
                <option>Student Visa</option>
                <option>Tourist Visa</option>
                <option>Work Visa</option>
                <option>Business Visa</option>
                <option>Dependent Visa</option>
                <option>Other</option>
              </Sel>
            </Field>
            <Field label="Country" required>
              <Sel value={current.country} onChange={setC("country")}>
                <option value="">Select Country</option>
                <option>UK</option><option>USA</option><option>Canada</option>
                <option>Australia</option><option>Germany</option><option>Ireland</option>
                <option>New Zealand</option><option>France</option><option>Netherlands</option>
                <option>India</option><option>Other</option>
              </Sel>
            </Field>
            <Field label="Date of Travel" required>
              <Input type="date" value={current.date} onChange={setC("date")} />
            </Field>
          </div>
          <Field label="Description" required>
            <textarea
              className="sp-textarea"
              placeholder="Enter Visa description"
              value={current.description}
              onChange={setC("description")}
              rows={3}
            />
          </Field>
          <div className="sp-app-actions" style={{ marginTop: "0.75rem" }}>
            <button className="sp-btn-primary" style={{ fontSize: "0.8rem", padding: "0.4rem 1rem" }} onClick={save}>💾 Save</button>
            <button className="sp-btn-ghost" style={{ fontSize: "0.8rem", padding: "0.4rem 1rem", color: "#e53e3e" }} onClick={() => setCurrent({ visaCategory: "", country: "", date: "", description: "" })}>🗑 Remove</button>
          </div>
        </div>
      </div>
    );
  };

  // Structured Medical Entry Form
  const MedicalEntryForm = ({ field, listField }) => {
    const entries = data[listField] || [];
    const [current, setCurrent] = useState({ fromDate: "", endDate: "" });
    const setC = (k) => (e) => setCurrent({ ...current, [k]: e.target.value });

    const save = () => {
      if (current.fromDate || current.endDate) {
        setData({ ...data, [listField]: [...entries, { ...current, id: Date.now() }] });
        setCurrent({ fromDate: "", endDate: "" });
      }
    };
    const remove = (id) => setData({ ...data, [listField]: entries.filter((e) => e.id !== id) });

    if (data[field] !== "yes") return null;
    return (
      <div style={{ marginTop: "0.75rem" }}>
        {entries.map((e, i) => (
          <div key={e.id} className="sp-app-chip" style={{ marginBottom: "0.5rem" }}>
            <span className="sp-app-num">#{i + 1}</span>
            <span className="sp-app-name">From: {e.fromDate}</span>
            <span className="sp-app-intake">To: {e.endDate}</span>
            <button className="sp-doc-remove" onClick={() => remove(e.id)}>✕</button>
          </div>
        ))}
        <div className="sp-visa-entry-form">
          <div className="sp-grid-2" style={{ marginBottom: "0.75rem" }}>
            <Field label="From Date" required>
              <Input type="date" value={current.fromDate} onChange={setC("fromDate")} />
            </Field>
            <Field label="To Date" required>
              <Input type="date" value={current.endDate} onChange={setC("endDate")} />
            </Field>
          </div>
          <div className="sp-app-actions" style={{ marginTop: "0.75rem" }}>
            <button className="sp-btn-primary" style={{ fontSize: "0.8rem", padding: "0.4rem 1rem" }} onClick={save}>💾 Save</button>
            <button className="sp-btn-ghost" style={{ fontSize: "0.8rem", padding: "0.4rem 1rem", color: "#e53e3e" }} onClick={() => setCurrent({ fromDate: "", endDate: "" })}>🗑 Remove</button>
          </div>
        </div>
      </div>
    );
  };

  // Simple YesNo with textarea (for disability & criminal)
  const YesNo = ({ label, field, detail, detailLabel }) => (
    <div className="sp-yesno-card">
      <div className="sp-yesno-row">
        <span className="sp-yesno-label">{label}</span>
        <RadioGroup
          name={field}
          options={[{ value: "yes", label: "Yes" }, { value: "no", label: "No" }]}
          value={data[field] || "no"}
          onChange={radio(field)}
        />
      </div>
      {data[field] === "yes" && detail && (
        <textarea
          className="sp-textarea"
          placeholder={detailLabel || "Please provide details..."}
          value={data[detail] || ""}
          onChange={set(detail)}
          rows={2}
          style={{ marginTop: "0.75rem" }}
        />
      )}
    </div>
  );

  // Structured YesNo card wrapper
  const StructuredYesNo = ({ label, field, children, addLabel }) => (
    <div className="sp-yesno-card">
      <div className="sp-yesno-row">
        <span className="sp-yesno-label">{label}</span>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <RadioGroup
            name={field}
            options={[{ value: "yes", label: "Yes" }, { value: "no", label: "No" }]}
            value={data[field] || "no"}
            onChange={radio(field)}
          />
          {data[field] === "yes" && (
            <button
              className="sp-btn-secondary"
              style={{ fontSize: "0.75rem", padding: "0.3rem 0.75rem", whiteSpace: "nowrap" }}
              onClick={(e) => e.preventDefault()}
            >
              + {addLabel || "Add Visa History"}
            </button>
          )}
        </div>
      </div>
      {children}
    </div>
  );

  return (
    <div className="sp-step-content">
      <div className="sp-step-intro">
        <h2>Background & Visa History</h2>
        <p>Emergency contacts and background information required for applications.</p>
      </div>

      <div className="sp-card">
        <SectionHeader icon="🆘" title="Emergency Contact" />
        <div className="sp-yesno-toggle" style={{ marginBottom: "1rem" }}>
          <span>Does the student have an emergency contact?</span>
          <RadioGroup name="hasEmergency" options={[{ value: "yes", label: "Yes" }, { value: "no", label: "No" }]} value={data.hasEmergency || "no"} onChange={radio("hasEmergency")} />
        </div>
        {data.hasEmergency === "yes" && (
          <div className="sp-grid-2">
            <Field label="Contact Name" required><Input placeholder="Full name" value={data.emgName || ""} onChange={set("emgName")} /></Field>
            <Field label="Relationship" required>
              <Sel value={data.emgRelation || ""} onChange={set("emgRelation")}>
                <option value="">Select relation</option>
                <option>Parent</option><option>Sibling</option><option>Spouse</option><option>Guardian</option><option>Other</option>
              </Sel>
            </Field>
            <Field label="Phone Number" required>
              <div className="sp-phone-row">
                <Sel value={data.emgCode || ""} onChange={set("emgCode")} style={{ width: "120px", flexShrink: 0 }}>
                  <option value="">+Code</option>
                  <option value="+91">🇮🇳 +91</option>
                  <option value="+92">🇵🇰 +92</option>
                  <option value="+1">🇺🇸 +1</option>
                  <option value="+44">🇬🇧 +44</option>
                </Sel>
                <Input placeholder="Phone number" value={data.emgPhone || ""} onChange={set("emgPhone")} style={{ flex: 1 }} />
              </div>
            </Field>
            <Field label="Email Address"><Input type="email" placeholder="emergency@email.com" value={data.emgEmail || ""} onChange={set("emgEmail")} /></Field>
          </div>
        )}
      </div>

      <div className="sp-card">
        <SectionHeader icon="🔍" title="Background Declarations" />
        <div className="sp-declarations">

          {/* ── Visa Refusal ── */}
          <StructuredYesNo label="Does the student have any Visa Refusal history?" field="visaRefusal" addLabel="Add Visa History">
            <VisaEntryForm field="visaRefusal" listField="visaRefusalEntries" />
          </StructuredYesNo>

          {/* ── Visa History ── */}
          <StructuredYesNo label="Does the student have any previous Visa History?" field="visaHistory" addLabel="Add Visa History">
            <VisaEntryForm field="visaHistory" listField="visaHistoryEntries" />
          </StructuredYesNo>

          {/* ── Medical Condition ── */}
          <StructuredYesNo label="Does the student have any serious Medical Condition?" field="medical" addLabel="Add Medical Record">
            <MedicalEntryForm field="medical" listField="medicalEntries" />
          </StructuredYesNo>

          {/* ── Disability & Criminal remain simple ── */}
          <YesNo label="Does the student have any Disability?" field="disability" detail="disabilityDetail" detailLabel="Please describe the disability and any accommodations needed..." />
          <YesNo label="Does the student have any Criminal Offence Record?" field="criminal" detail="criminalDetail" detailLabel="Please provide details of the offence and outcome..." />
        </div>
      </div>
    </div>
  );
};

/* ─── Student Step 4: Documents ─────────────────────────────────────────────── */
const StepDocuments = ({ data, setData }) => {
  const [dragOver, setDragOver] = useState(false);
  const fileRef = useRef();
  const uploaded = data.files || [];
  const docTypes = [
    "Passport Copy", "Academic Transcripts", "Degree Certificate", "IELTS/PTE/TOEFL Score",
    "Statement of Purpose (SOP)", "Letter of Recommendation (LOR)", "CV / Resume",
    "Bank Statement", "Proof of Address", "Photo ID", "Work Experience Letter", "Other",
  ];

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    setData({ ...data, files: [...uploaded, ...files.map((f) => ({ name: f.name, size: f.size, type: data.docType || "Other" }))] });
  };

  const handleSelect = (e) => {
    const files = Array.from(e.target.files);
    setData({ ...data, files: [...uploaded, ...files.map((f) => ({ name: f.name, size: f.size, type: data.docType || "Other" }))] });
  };

  return (
    <div className="sp-step-content">
      <div className="sp-step-intro">
        <h2>Documents Upload</h2>
        <p>Upload supporting documents. Max 10MB per file. PDF, JPG, PNG accepted.</p>
      </div>

      <div className="sp-card">
        <SectionHeader icon="📂" title="Upload Documents" />
        <Field label="Document Type" required>
          <Sel value={data.docType || ""} onChange={(e) => setData({ ...data, docType: e.target.value })}>
            <option value="">Select document type</option>
            {docTypes.map((d) => <option key={d}>{d}</option>)}
          </Sel>
        </Field>
        <div
          className={`sp-dropzone ${dragOver ? "dragover" : ""}`}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => fileRef.current?.click()}
        >
          <input ref={fileRef} type="file" multiple style={{ display: "none" }} onChange={handleSelect} />
          <div className="sp-dropzone-icon">📎</div>
          <p className="sp-dropzone-text">Drag & drop files here, or <span>browse</span></p>
          <p className="sp-dropzone-hint">PDF, DOC, JPG, PNG · Max 10MB per file</p>
        </div>
        {uploaded.length > 0 && (
          <div className="sp-uploaded-list">
            <h4>Uploaded Documents</h4>
            {uploaded.map((f, i) => (
              <div key={i} className="sp-uploaded-item">
                <span className="sp-doc-icon">📄</span>
                <div className="sp-doc-info">
                  <span className="sp-doc-name">{f.name}</span>
                  <span className="sp-doc-meta">{f.type} · {(f.size / 1024).toFixed(1)} KB</span>
                </div>
                <button className="sp-doc-remove" onClick={() => setData({ ...data, files: uploaded.filter((_, j) => j !== i) })}>✕</button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="sp-card">
        <SectionHeader icon="✅" title="Document Checklist" />
        <div className="sp-doc-checklist">
          {docTypes.slice(0, 8).map((d) => {
            const done = uploaded.some((f) => f.type === d);
            return (
              <div key={d} className={`sp-checklist-item ${done ? "done" : ""}`}>
                <span className="sp-check-icon">{done ? "✓" : "○"}</span>
                {d}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

/* ─── Student Step 5: Application ───────────────────────────────────────────── */
const StepApplication = ({ data, setData }) => {
  const apps = data.apps || [];
  const [cur, setCur] = useState({});
  const setC = (k) => (e) => setCur({ ...cur, [k]: e.target.value });

  const saveApp = () => {
    if (cur.university && cur.course) {
      setData({ ...data, apps: [...apps, { ...cur, id: Date.now() }] });
      setCur({});
    }
  };

  return (
    <div className="sp-step-content">
      <div className="sp-step-intro">
        <h2>Create Application</h2>
        <p>Add one or more university applications for this student.</p>
      </div>

      {apps.length > 0 && (
        <div className="sp-apps-list">
          {apps.map((a, i) => (
            <div key={a.id} className="sp-app-chip">
              <span className="sp-app-num">App #{i + 1}</span>
              <span className="sp-app-name">{a.university}</span>
              <span className="sp-app-course">{a.course}</span>
              <span className="sp-app-intake">{a.intakeMonth} {a.intakeYear}</span>
              <button className="sp-doc-remove" onClick={() => setData({ ...data, apps: apps.filter((x) => x.id !== a.id) })}>✕</button>
            </div>
          ))}
        </div>
      )}

      <div className="sp-card">
        <SectionHeader icon="🏛️" title="New Application" />
        <div className="sp-grid-3">
          <Field label="Country To" required>
            <Sel value={cur.country || ""} onChange={setC("country")}>
              <option value="">Select country</option>
              <option>UK</option><option>USA</option><option>Canada</option>
              <option>Australia</option><option>Germany</option>
              <option>Ireland</option><option>New Zealand</option>
            </Sel>
          </Field>
          <Field label="Academic Level" required>
            <Sel value={cur.acadLevel || ""} onChange={setC("acadLevel")}>
              <option value="">Select level</option>
              <option>Undergraduate (UG)</option>
              <option>Postgraduate (PG)</option>
              <option>PhD / Doctorate</option>
              <option>Diploma</option>
              <option>Foundation</option>
            </Sel>
          </Field>
          <Field label="Intake Month" required>
            <Sel value={cur.intakeMonth || ""} onChange={setC("intakeMonth")}>
              <option value="">Month</option>
              <option>January</option><option>May</option>
              <option>September</option><option>October</option>
            </Sel>
          </Field>
        </div>
        <div className="sp-grid-2" style={{ marginTop: "1.25rem" }}>
          <Field label="University" required>
            <Input placeholder="Search university name..." value={cur.university || ""} onChange={setC("university")} />
          </Field>
          <Field label="Course / Program" required>
            <Input placeholder="Search course or program..." value={cur.course || ""} onChange={setC("course")} />
          </Field>
          <Field label="Intake Year" required>
            <Sel value={cur.intakeYear || ""} onChange={setC("intakeYear")}>
              <option value="">Year</option>
              <option>2025</option><option>2026</option><option>2027</option>
            </Sel>
          </Field>
          <Field label="First Year Fee">
            <Input placeholder="–" value={cur.fee || ""} onChange={setC("fee")} />
          </Field>
          <Field label="Scholarship Available">
            <Input placeholder="Scholarship details (if any)" value={cur.scholarship || ""} onChange={setC("scholarship")} />
          </Field>
          <Field label="Duration">
            <Input placeholder="e.g. 2 years" value={cur.duration || ""} onChange={setC("duration")} />
          </Field>
        </div>
        <div className="sp-app-actions">
          <button className="sp-btn-primary" onClick={saveApp}>+ Save Application</button>
          <button className="sp-btn-ghost" onClick={() => setCur({})}>Clear</button>
        </div>
      </div>

      <div className="sp-card">
        <SectionHeader icon="📋" title="Submission Summary" />
        <div className="sp-summary-meta">
          <div className="sp-summary-item">
            <span>Student</span>
            <strong>{data?.firstName || "—"} {data?.lastName || ""}</strong>
          </div>
          <div className="sp-summary-item">
            <span>Applications</span>
            <strong>{apps.length} application(s)</strong>
          </div>
          <div className="sp-summary-item">
            <span>Status</span>
            <strong><span className="sp-status-badge">Draft</span></strong>
          </div>
        </div>
        <div className="sp-info-box">
          ✅ Review all tabs before final submission. You can save as draft and return later.
        </div>
      </div>
    </div>
  );
};

/* ════════════════════════════════════════════════════════════════════════════
   ENQUIRY FORM — Step Config & Steps
════════════════════════════════════════════════════════════════════════════ */
const ENQ_STEPS = [
  { id: 1, label: "Contact Info", sub: "Name, phone & email" },
  { id: 2, label: "Study Interest", sub: "Destination & program" },
  { id: 3, label: "Lead Details", sub: "Source, priority & notes" },
  { id: 4, label: "Review & Submit", sub: "Confirm & send" },
];

/* ─── Enquiry Step 1: Contact Info ──────────────────────────────────────────── */
const EnqContact = ({ data, setData }) => {
  const set = (k) => (e) => setData({ ...data, [k]: e.target.value });

  return (
    <div className="sp-step-content">
      <div className="sp-enq-banner">
        <div className="sp-enq-banner-icon">📋</div>
        <h2>New Enquiry</h2>
        <p>Capture a new prospective student lead. Fill in the contact details to get started.</p>
      </div>

      <div className="sp-card">
        <SectionHeader icon="👤" title="Contact Information" />
        <div className="sp-grid-2">
          <Field label="First Name" required>
            <Input placeholder="Enter first name" value={data.firstName || ""} onChange={set("firstName")} />
          </Field>
          <Field label="Last Name">
            <Input placeholder="Enter last name" value={data.lastName || ""} onChange={set("lastName")} />
          </Field>
          <Field label="Email Address">
            <Input type="email" placeholder="prospect@email.com" value={data.email || ""} onChange={set("email")} />
          </Field>
          <Field label="Date of Birth">
            <Input type="date" value={data.dob || ""} onChange={set("dob")} />
          </Field>
        </div>
        <div className="sp-grid-3" style={{ marginTop: "1.25rem" }}>
          <Field label="Primary Phone" required>
            <div className="sp-phone-row">
              <Sel value={data.phoneCode || ""} onChange={set("phoneCode")} style={{ width: "110px" }}>
                <option value="">+Code</option>
                <option value="+91">🇮🇳 +91</option>
                <option value="+92">🇵🇰 +92</option>
                <option value="+880">🇧🇩 +880</option>
                <option value="+977">🇳🇵 +977</option>
                <option value="+1">🇺🇸 +1</option>
                <option value="+44">🇬🇧 +44</option>
              </Sel>
              <Input placeholder="Phone number" value={data.phone || ""} onChange={set("phone")} style={{ flex: 1 }} />
            </div>
          </Field>
          <Field label="WhatsApp">
            <div className="sp-phone-row">
              <Sel value={data.waCode || ""} onChange={set("waCode")} style={{ width: "110px" }}>
                <option value="">+Code</option>
                <option value="+91">🇮🇳 +91</option>
                <option value="+92">🇵🇰 +92</option>
              </Sel>
              <Input placeholder="WhatsApp" value={data.whatsapp || ""} onChange={set("whatsapp")} style={{ flex: 1 }} />
            </div>
          </Field>
          <Field label="Nationality">
            <Sel value={data.nationality || ""} onChange={set("nationality")}>
              <option value="">Select nationality</option>
              <option>Indian</option>
              <option>Pakistani</option>
              <option>Bangladeshi</option>
              <option>Nepali</option>
              <option>Sri Lankan</option>
              <option>Nigerian</option>
              <option>Other</option>
            </Sel>
          </Field>
        </div>
        <div className="sp-grid-2" style={{ marginTop: "1.25rem" }}>
          <Field label="City">
            <Input placeholder="City" value={data.city || ""} onChange={set("city")} />
          </Field>
          <Field label="Assigned Consultant" required>
            <Sel value={data.owner || ""} onChange={set("owner")}>
              <option value="">Select consultant</option>
              <option>Raju Rama (You)</option>
              <option>Priya Shah</option>
              <option>Ahmed Khan</option>
            </Sel>
          </Field>
        </div>
      </div>
    </div>
  );
};

/* ─── Enquiry Step 2: Study Interest ───────────────────────────────────────── */
const EnqStudyInterest = ({ data, setData }) => {
  const set = (k) => (e) => setData({ ...data, [k]: e.target.value });
  const countries = ["UK", "USA", "Canada", "Australia", "Germany", "Ireland", "New Zealand", "France", "Netherlands", "Dubai"];
  const interests = ["Computer Science", "Business & MBA", "Engineering", "Nursing & Healthcare", "Law", "Architecture", "Media & Arts", "Finance", "Data Science", "Hospitality"];
  const destinations = data.destinations || [];
  const selectedInterests = data.interests || [];
  const toggleDest = (c) => setData({ ...data, destinations: destinations.includes(c) ? destinations.filter((d) => d !== c) : [...destinations, c] });
  const toggleInt = (i) => setData({ ...data, interests: selectedInterests.includes(i) ? selectedInterests.filter((x) => x !== i) : [...selectedInterests, i] });

  return (
    <div className="sp-step-content">
      <div className="sp-step-intro">
        <h2>Study Interests</h2>
        <p>What is the prospect interested in studying and where?</p>
      </div>

      <div className="sp-card">
        <SectionHeader icon="🌍" title="Preferred Destinations" />
        <div className="sp-dest-grid" style={{ marginTop: 0 }}>
          {countries.map((c) => (
            <button key={c} className={`sp-dest-btn ${destinations.includes(c) ? "selected" : ""}`} onClick={() => toggleDest(c)}>{c}</button>
          ))}
        </div>
      </div>

      <div className="sp-card">
        <SectionHeader icon="📚" title="Field of Interest" />
        <div className="sp-interest-grid">
          {interests.map((i) => (
            <button key={i} className={`sp-interest-btn ${selectedInterests.includes(i) ? "selected" : ""}`} onClick={() => toggleInt(i)}>{i}</button>
          ))}
        </div>
        <div className="sp-grid-3" style={{ marginTop: "1.25rem" }}>
          <Field label="Academic Level">
            <Sel value={data.acadLevel || ""} onChange={set("acadLevel")}>
              <option value="">Select level</option>
              <option>Certificate</option>
              <option>Diploma</option>
              <option>Foundation</option>
              <option>Undergraduate (UG)</option>
              <option>Postgraduate (PG)</option>
              <option>PhD / Doctorate</option>
            </Sel>
          </Field>
          <Field label="Preferred Intake">
            <Sel value={data.intake || ""} onChange={set("intake")}>
              <option value="">Select intake</option>
              <option>January</option>
              <option>May</option>
              <option>September</option>
              <option>October</option>
            </Sel>
          </Field>
          <Field label="Preferred Year">
            <Sel value={data.intakeYear || ""} onChange={set("intakeYear")}>
              <option value="">Select year</option>
              <option>2025</option>
              <option>2026</option>
              <option>2027</option>
            </Sel>
          </Field>
        </div>
        <div className="sp-grid-2" style={{ marginTop: "1.25rem" }}>
          <Field label="Budget (Annual Tuition)">
            <Sel value={data.budget || ""} onChange={set("budget")}>
              <option value="">Select range</option>
              <option>Under $10,000</option>
              <option>$10,000 – $20,000</option>
              <option>$20,000 – $30,000</option>
              <option>$30,000 – $40,000</option>
              <option>Above $40,000</option>
            </Sel>
          </Field>
          <Field label="Current Education Level">
            <Sel value={data.eduLevel || ""} onChange={set("eduLevel")}>
              <option value="">Select level</option>
              <option>High School (10th)</option>
              <option>Senior Secondary (12th)</option>
              <option>Diploma</option>
              <option>Bachelor's Degree</option>
              <option>Master's Degree</option>
            </Sel>
          </Field>
        </div>
      </div>
    </div>
  );
};

/* ─── Enquiry Step 3: Lead Details ─────────────────────────────────────────── */
const EnqLeadDetails = ({ data, setData }) => {
  const set = (k) => (e) => setData({ ...data, [k]: e.target.value });
  const sources = [
    { value: "Walk-in", icon: "🚶" }, { value: "Referral", icon: "🤝" },
    { value: "Social Media", icon: "📱" }, { value: "Website", icon: "🌐" },
    { value: "Education Fair", icon: "🎪" }, { value: "Google Ads", icon: "🔍" },
    { value: "WhatsApp", icon: "💬" }, { value: "Cold Call", icon: "📞" },
  ];
  const priorities = ["Low", "Medium", "High", "Urgent"];
  const followups = ["Today", "Tomorrow", "This Week", "Next Week", "This Month"];

  return (
    <div className="sp-step-content">
      <div className="sp-step-intro">
        <h2>Lead Details</h2>
        <p>Source, priority level and follow-up scheduling for this enquiry.</p>
      </div>

      <div className="sp-card">
        <SectionHeader icon="📡" title="Lead Source" />
        <div className="sp-source-grid">
          {sources.map((s) => (
            <button key={s.value} className={`sp-source-btn ${data.source === s.value ? "selected" : ""}`} onClick={() => setData({ ...data, source: s.value })}>
              <span>{s.icon}</span>{s.value}
            </button>
          ))}
        </div>
        {data.source === "Referral" && (
          <div style={{ marginTop: "1rem" }}>
            <Field label="Referral Name">
              <Input placeholder="Who referred this prospect?" value={data.referralName || ""} onChange={set("referralName")} />
            </Field>
          </div>
        )}
      </div>

      <div className="sp-card">
        <SectionHeader icon="🎯" title="Priority Level" />
        <div className="sp-priority-row">
          {priorities.map((p) => (
            <button key={p} className={`sp-priority-btn p-${p.toLowerCase()} ${data.priority === p ? "selected" : ""}`} onClick={() => setData({ ...data, priority: p })}>{p}</button>
          ))}
        </div>
      </div>

      <div className="sp-card">
        <SectionHeader icon="📅" title="Follow-up Schedule" />
        <div style={{ marginBottom: "0.75rem" }}>
          <label className="sp-label">Follow-up Timeline</label>
          <div className="sp-followup-row" style={{ marginTop: "0.5rem" }}>
            {followups.map((f) => (
              <button key={f} className={`sp-followup-btn ${data.followup === f ? "selected" : ""}`} onClick={() => setData({ ...data, followup: f })}>{f}</button>
            ))}
          </div>
        </div>
        <Field label="Follow-up Date">
          <Input type="date" value={data.followupDate || ""} onChange={set("followupDate")} />
        </Field>
        <div style={{ marginTop: "1.25rem" }}>
          <Field label="Notes / Remarks">
            <textarea className="sp-textarea" placeholder="Any additional notes about this lead, specific requirements, or special instructions..." value={data.notes || ""} onChange={set("notes")} rows={4} />
          </Field>
        </div>
      </div>
    </div>
  );
};

/* ─── Enquiry Step 4: Review & Submit ──────────────────────────────────────── */
const EnqReview = ({ data, onSubmit }) => {
  const [consent, setConsent] = useState(false);
  const val = (v) => v || <span className="sp-enq-sum-value empty">—</span>;

  return (
    <div className="sp-step-content">
      <div className="sp-step-intro">
        <h2>Review & Submit</h2>
        <p>Review the enquiry details before submitting to the CRM.</p>
      </div>

      <div className="sp-card">
        <SectionHeader icon="👤" title="Contact Summary" />
        <div className="sp-enq-summary-grid">
          <div className="sp-enq-sum-row"><span className="sp-enq-sum-label">Full Name</span><span className="sp-enq-sum-value">{val(`${data.firstName || ""} ${data.lastName || ""}`.trim())}</span></div>
          <div className="sp-enq-sum-row"><span className="sp-enq-sum-label">Email</span><span className="sp-enq-sum-value">{val(data.email)}</span></div>
          <div className="sp-enq-sum-row"><span className="sp-enq-sum-label">Phone</span><span className="sp-enq-sum-value">{val(data.phoneCode && data.phone ? `${data.phoneCode} ${data.phone}` : "")}</span></div>
          <div className="sp-enq-sum-row"><span className="sp-enq-sum-label">Nationality</span><span className="sp-enq-sum-value">{val(data.nationality)}</span></div>
          <div className="sp-enq-sum-row"><span className="sp-enq-sum-label">Assigned To</span><span className="sp-enq-sum-value">{val(data.owner)}</span></div>
          <div className="sp-enq-sum-row"><span className="sp-enq-sum-label">City</span><span className="sp-enq-sum-value">{val(data.city)}</span></div>
        </div>
      </div>

      <div className="sp-card">
        <SectionHeader icon="📚" title="Study Interest Summary" />
        <div className="sp-enq-summary-grid">
          <div className="sp-enq-sum-row"><span className="sp-enq-sum-label">Destinations</span><span className="sp-enq-sum-value">{val((data.destinations || []).join(", "))}</span></div>
          <div className="sp-enq-sum-row"><span className="sp-enq-sum-label">Interests</span><span className="sp-enq-sum-value">{val((data.interests || []).slice(0, 3).join(", "))}</span></div>
          <div className="sp-enq-sum-row"><span className="sp-enq-sum-label">Level</span><span className="sp-enq-sum-value">{val(data.acadLevel)}</span></div>
          <div className="sp-enq-sum-row"><span className="sp-enq-sum-label">Intake</span><span className="sp-enq-sum-value">{val(data.intake && data.intakeYear ? `${data.intake} ${data.intakeYear}` : "")}</span></div>
          <div className="sp-enq-sum-row"><span className="sp-enq-sum-label">Budget</span><span className="sp-enq-sum-value">{val(data.budget)}</span></div>
        </div>
      </div>

      <div className="sp-card">
        <SectionHeader icon="🎯" title="Lead Info Summary" />
        <div className="sp-enq-summary-grid">
          <div className="sp-enq-sum-row"><span className="sp-enq-sum-label">Source</span><span className="sp-enq-sum-value">{val(data.source)}</span></div>
          <div className="sp-enq-sum-row"><span className="sp-enq-sum-label">Priority</span><span className="sp-enq-sum-value">{val(data.priority)}</span></div>
          <div className="sp-enq-sum-row"><span className="sp-enq-sum-label">Follow-up</span><span className="sp-enq-sum-value">{val(data.followup)}</span></div>
          <div className="sp-enq-sum-row"><span className="sp-enq-sum-label">Follow-up Date</span><span className="sp-enq-sum-value">{val(data.followupDate)}</span></div>
        </div>
        {data.notes && <div className="sp-info-box" style={{ marginTop: "0.75rem" }}>📝 {data.notes}</div>}
      </div>

      <div className="sp-card">
        <div className="sp-consent-box">
          <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
          <span className="sp-consent-text">
            I confirm that the information provided is accurate and that the prospect has consented to being contacted.
            This enquiry will be logged in the <a href="#">Student CRM</a> and a follow-up task will be created automatically.
          </span>
        </div>
        <div className="sp-app-actions">
          <button
            className="sp-nav-btn sp-nav-submit"
            disabled={!consent}
            style={{ opacity: consent ? 1 : 0.5, cursor: consent ? "pointer" : "not-allowed" }}
            onClick={onSubmit}
          >
            Submit Enquiry ✓
          </button>
          <button className="sp-nav-btn sp-nav-draft">Save as Draft</button>
        </div>
      </div>
    </div>
  );
};

/* ─── Enquiry Success Screen ────────────────────────────────────────────────── */
const EnqSuccess = ({ data, onReset }) => (
  <div className="sp-step-content">
    <div className="sp-success-card">
      <div className="sp-success-icon">🎉</div>
      <h2>Enquiry Submitted!</h2>
      <p>
        The enquiry for <strong>{data.firstName} {data.lastName}</strong> has been successfully logged.
        A follow-up task has been created and assigned to {data.owner || "the consultant"}.
      </p>
      <div className="sp-success-ref">Ref: ENQ-{Math.floor(Math.random() * 90000 + 10000)}</div>
      <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}>
        <button className="sp-btn-primary" onClick={onReset}>+ New Enquiry</button>
        <button className="sp-btn-ghost">View All Enquiries →</button>
      </div>
    </div>
  </div>
);

/* ════════════════════════════════════════════════════════════════════════════
   MAIN PORTAL COMPONENT
════════════════════════════════════════════════════════════════════════════ */
export default function StudentPortal() {
  const [mode, setMode] = useState("student"); // "student" | "enquiry"
  const [studentStep, setStudentStep] = useState(1);
  const [enqStep, setEnqStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [enqData, setEnqData] = useState({});
  const [enqSubmitted, setEnqSubmitted] = useState(false);
  const [fetchId, setFetchId] = useState("");

  const setSD = (key) => (val) => setFormData((prev) => ({ ...prev, [key]: val }));

  const studentProgress = Math.round(((studentStep - 1) / (STUDENT_STEPS.length - 1)) * 100);
  const enqProgress = Math.round(((enqStep - 1) / (ENQ_STEPS.length - 1)) * 100);
  const progress = mode === "student" ? studentProgress : enqProgress;

  const renderStudentStep = () => {
    switch (studentStep) {
      case 1: return <StepPersonal data={formData} setData={setFormData} />;
      case 2: return <StepEducation data={formData.education || {}} setData={setSD("education")} />;
      case 3: return <StepBackground data={formData.prefs || {}} setData={setSD("prefs")} />;
      case 4: return <StepDocuments data={formData.docs || {}} setData={setSD("docs")} />;
      case 5: return <StepApplication data={{ ...(formData.app || {}), firstName: formData.firstName, lastName: formData.lastName }} setData={setSD("app")} />;
      default: return null;
    }
  };

  const renderEnqStep = () => {
    if (enqSubmitted) return <EnqSuccess data={enqData} onReset={() => { setEnqData({}); setEnqStep(1); setEnqSubmitted(false); }} />;
    switch (enqStep) {
      case 1: return <EnqContact data={enqData} setData={setEnqData} />;
      case 2: return <EnqStudyInterest data={enqData} setData={setEnqData} />;
      case 3: return <EnqLeadDetails data={enqData} setData={setEnqData} />;
      case 4: return <EnqReview data={enqData} setData={setEnqData} onSubmit={() => setEnqSubmitted(true)} />;
      default: return null;
    }
  };

  const currentSteps = mode === "student" ? STUDENT_STEPS : ENQ_STEPS;
  const currentStep = mode === "student" ? studentStep : enqStep;
  const setCurrentStep = mode === "student" ? setStudentStep : setEnqStep;
  const isLastStep = currentStep === currentSteps.length;

  return (
    <div className="sp-root">
      {/* ── Topbar ── */}
      <div className="sp-topbar">
        <div className="sp-breadcrumb">
          <span className="sp-breadcrumb-link">Dashboard</span>
          <span className="sp-breadcrumb-sep">›</span>
          <span className="sp-breadcrumb-current">{mode === "student" ? "Add Student" : "New Enquiry"}</span>
        </div>
        <div className="sp-fetch-area">
          <input
            className="sp-fetch-input"
            placeholder="Fetch by Unique ID, Email or Passport No."
            value={fetchId}
            onChange={(e) => setFetchId(e.target.value)}
          />
          <button className="sp-fetch-btn">Fetch Data</button>
        </div>
      </div>

      {/* ── Progress Bar ── */}
      <div className="sp-progress-outer">
        <div className="sp-progress-inner" style={{ width: `${progress}%` }} />
      </div>

      {/* ── Body ── */}
      <div className="sp-body">
        {/* ── Sidebar ── */}
        <aside className="sp-sidebar">
          <div className="sp-sidebar-brand">
            <div className="sp-brand-icon">✈️</div>
            <div>
              <div className="sp-brand-title">Student Portal</div>
              <div className="sp-brand-sub">{mode === "student" ? "New Application" : "Lead Capture"}</div>
            </div>
          </div>

          {/* Mode Toggle */}
          <div className="sp-mode-toggle">
            <button className={`sp-mode-btn ${mode === "student" ? "active" : ""}`} onClick={() => setMode("student")}>Student Details</button>
            <button className={`sp-mode-btn ${mode === "enquiry" ? "active" : ""}`} onClick={() => setMode("enquiry")}>Enquiry Form</button>
          </div>

          {/* Steps Nav */}
          <nav className="sp-steps-nav">
            {currentSteps.map((s) => {
              const state = s.id < currentStep ? "done" : s.id === currentStep ? "active" : "pending";
              return (
                <button key={s.id} className={`sp-step-btn ${state}`} onClick={() => setCurrentStep(s.id)}>
                  <div className="sp-step-indicator">
                    {state === "done" ? <span>✓</span> : <span>{s.id}</span>}
                  </div>
                  <div className="sp-step-meta">
                    <span className="sp-step-label">{s.label}</span>
                    <span className="sp-step-sub">{s.sub}</span>
                  </div>
                </button>
              );
            })}
          </nav>

          <div className="sp-sidebar-footer">
            <div className="sp-progress-label">{progress}% complete</div>
            <div className="sp-progress-mini">
              <div className="sp-progress-mini-fill" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </aside>

        {/* ── Main Content ── */}
        <main className="sp-main">
          <div className="sp-main-inner">
            {mode === "student" ? renderStudentStep() : renderEnqStep()}

            {/* Bottom Navigation */}
            {!(mode === "enquiry" && enqSubmitted) && (
              <div className="sp-nav-footer">
                {currentStep > 1 ? (
                  <button className="sp-nav-btn sp-nav-prev" onClick={() => setCurrentStep((s) => s - 1)}>← Previous</button>
                ) : (
                  <div />
                )}
                <div className="sp-nav-right">
                  <button className="sp-nav-btn sp-nav-draft">Save as Draft</button>
                  {!isLastStep ? (
                    <button className="sp-nav-btn sp-nav-next" onClick={() => setCurrentStep((s) => s + 1)}>Save & Next →</button>
                  ) : mode === "student" ? (
                    <button className="sp-nav-btn sp-nav-submit">Submit Profile ✓</button>
                  ) : null}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
