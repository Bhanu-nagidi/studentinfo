import { useState, useRef } from "react";
import "./AddStudent.css";

// ─── Step Config ──────────────────────────────────────────────────────────────
const STEPS = [
  { id: 1, key: "personal_contact_identity", label: "Personal, Contact & Identity", icon: "⬡", sub: "Basic info, address & passport" },
  { id: 2, key: "education", label: "Education", icon: "⬡", sub: "Academic background" },
  { id: 3, key: "preferences_background", label: "Study Prefs & Background", icon: "⬡", sub: "Goals, visa & history" },
  { id: 4, key: "documents", label: "Documents", icon: "⬡", sub: "Upload required files" },
  { id: 5, key: "application", label: "Application", icon: "⬡", sub: "Create & review" },
];

// ─── Reusable Field Components ─────────────────────────────────────────────────
const Field = ({ label, required, children, half }) => (
  <div className={`as-field ${half ? "as-field--half" : ""}`}>
    <label className="as-label">
      {label} {required && <span className="as-req">*</span>}
    </label>
    {children}
  </div>
);

const Input = (props) => <input className="as-input" {...props} />;

const Select = ({ children, ...props }) => (
  <div className="as-select-wrap">
    <select className="as-select" {...props}>{children}</select>
    <span className="as-select-arrow">▾</span>
  </div>
);

const RadioGroup = ({ options, value, onChange, name }) => (
  <div className="as-radio-group">
    {options.map((o) => (
      <label key={o.value} className={`as-radio-label ${value === o.value ? "active" : ""}`}>
        <input type="radio" name={name} value={o.value} checked={value === o.value} onChange={() => onChange(o.value)} />
        {o.label}
      </label>
    ))}
  </div>
);

const SectionHeader = ({ icon, title, action }) => (
  <div className="as-section-header">
    <div className="as-section-title">
      <span className="as-section-icon">{icon}</span>
      <h3>{title}</h3>
    </div>
    {action}
  </div>
);

const Tag = ({ label, onRemove }) => (
  <span className="as-tag">
    {label}
    <button onClick={onRemove} className="as-tag-remove">×</button>
  </span>
);

// ─── Step 1: Personal Info ─────────────────────────────────────────────────────
const StepPersonal = ({ data, setData }) => {
  const set = (k) => (e) => setData({ ...data, [k]: e.target.value });
  return (
    <div className="as-step-content">
      <div className="as-step-intro">
        <h2>Personal Information</h2>
        <p>Start with the student's basic personal details. Fields marked <span className="as-req">*</span> are required.</p>
      </div>
      <div className="as-card">
        <SectionHeader icon="👤" title="Basic Details" />
        <div className="as-grid-2">
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

        <div className="as-grid-3">
          <Field label="Gender" required>
            <Select value={data.gender || ""} onChange={set("gender")}>
              <option value="">Select gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Non-binary</option>
              <option>Prefer not to say</option>
            </Select>
          </Field>
          <Field label="Marital Status" required>
            <Select value={data.marital || ""} onChange={set("marital")}>
              <option value="">Select status</option>
              <option>Single</option>
              <option>Married</option>
              <option>Divorced</option>
              <option>Widowed</option>
            </Select>
          </Field>
          <Field label="Nationality" required>
            <Select value={data.nationality || ""} onChange={set("nationality")}>
              <option value="">Select nationality</option>
              <option>Indian</option>
              <option>Pakistani</option>
              <option>Bangladeshi</option>
              <option>Nepali</option>
              <option>Sri Lankan</option>
              <option>Nigerian</option>
              <option>Other</option>
            </Select>
          </Field>
        </div>
      </div>

      <div className="as-card">
        <SectionHeader icon="🏢" title="Consultant Assignment" />
        <div className="as-grid-2">
          <Field label="App Owner / Assigned Consultant" required>
            <Select value={data.owner || ""} onChange={set("owner")}>
              <option value="">Select consultant</option>
              <option>Raju Rama (You)</option>
              <option>Priya Shah</option>
              <option>Ahmed Khan</option>
            </Select>
          </Field>
          {/* <Field label="Lead Source">
            <Select value={data.leadSource || ""} onChange={set("leadSource")}>
              <option value="">How did they find us?</option>
              <option>Walk-in</option>
              <option>Referral</option>
              <option>Social Media</option>
              <option>Website</option>
              <option>Education Fair</option>
              <option>Other</option>
            </Select>
          </Field>*/}
        </div>
      </div>
    </div>
  );
};

// ─── Step 2: Contact & Address ─────────────────────────────────────────────────
const StepContact = ({ data, setData }) => {
  const set = (k) => (e) => setData({ ...data, [k]: e.target.value });
  return (
    <div className="as-step-content">
      <div className="as-step-intro">
        <h2>Contact & Address</h2>
        <p>Student's contact numbers and current residential address.</p>
      </div>

      <div className="as-card">
        <SectionHeader icon="📞" title="Contact Numbers" />
        <div className="as-grid-2">
          <Field label="Primary Phone" required>
            <div className="as-phone-row">
              <Select value={data.phoneCode || ""} onChange={set("phoneCode")} style={{ width: "120px", flexShrink: 0 }}>
                <option value="">+Code</option>
                <option value="+91">🇮🇳 +91</option>
                <option value="+92">🇵🇰 +92</option>
                <option value="+880">🇧🇩 +880</option>
                <option value="+977">🇳🇵 +977</option>
                <option value="+1">🇺🇸 +1</option>
                <option value="+44">🇬🇧 +44</option>
                <option value="+61">🇦🇺 +61</option>
              </Select>
              <Input placeholder="Phone number" value={data.phone || ""} onChange={set("phone")} style={{ flex: 1 }} />
            </div>
          </Field>
          <Field label="WhatsApp Number">
            <div className="as-phone-row">
              <Select value={data.waCode || ""} onChange={set("waCode")} style={{ width: "120px", flexShrink: 0 }}>
                <option value="">+Code</option>
                <option value="+91">🇮🇳 +91</option>
                <option value="+92">🇵🇰 +92</option>
                <option value="+880">🇧🇩 +880</option>
                <option value="+977">🇳🇵 +977</option>
                <option value="+1">🇺🇸 +1</option>
                <option value="+44">🇬🇧 +44</option>
              </Select>
              <Input placeholder="WhatsApp number" value={data.whatsapp || ""} onChange={set("whatsapp")} style={{ flex: 1 }} />
            </div>
          </Field>
          <Field label="Alternate Email">
            <Input type="email" placeholder="Alternate email (optional)" value={data.altEmail || ""} onChange={set("altEmail")} />
          </Field>
        </div>
      </div>

      <div className="as-card">
        <SectionHeader icon="🏠" title="Current Address" />
        <div className="as-grid-1">
          <Field label="Address Line 1" required>
            <Input placeholder="Street address, apartment, suite" value={data.address1 || ""} onChange={set("address1")} />
          </Field>
          <Field label="Address Line 2">
            <Input placeholder="Landmark, locality (optional)" value={data.address2 || ""} onChange={set("address2")} />
          </Field>
        </div>
        <div className="as-grid-3">
          <Field label="Country" required>
            <Select value={data.country || ""} onChange={set("country")}>
              <option value="">Select country</option>
              <option>India</option>
              <option>Pakistan</option>
              <option>Bangladesh</option>
              <option>Nepal</option>
              <option>Nigeria</option>
              <option>Other</option>
            </Select>
          </Field>
          <Field label="State / Region" required>
            <Select value={data.state || ""} onChange={set("state")}>
              <option value="">Select state</option>
              <option>Telangana</option>
              <option>Maharashtra</option>
              <option>Karnataka</option>
              <option>Delhi</option>
              <option>Other</option>
            </Select>
          </Field>
          <Field label="City" required>
            <Select value={data.city || ""} onChange={set("city")}>
              <option value="">Select city</option>
              <option>Hyderabad</option>
              <option>Mumbai</option>
              <option>Bangalore</option>
              <option>Chennai</option>
              <option>Other</option>
            </Select>
          </Field>
        </div>
        <div className="as-grid-2">
          <Field label="Postal / ZIP Code" required>
            <Input placeholder="Postal code" value={data.postal || ""} onChange={set("postal")} />
          </Field>
        </div>
      </div>
    </div>
  );
};

// ─── Step 3: Passport & Identity ───────────────────────────────────────────────
const StepPassport = ({ data, setData }) => {
  const set = (k) => (e) => setData({ ...data, [k]: e.target.value });
  return (
    <div className="as-step-content">
      <div className="as-step-intro">
        <h2>Passport & Identity</h2>
        <p>Travel document details for visa and application processing.</p>
      </div>

      <div className="as-card">
        <SectionHeader title="Passport Details" />
        <div className="as-grid-2">
          <Field label="Passport Number" required>
            <Input placeholder="e.g. A1234567" value={data.passportNo || ""} onChange={set("passportNo")} />
          </Field>
          <Field label="Country of Issue" required>
            <Select value={data.passportCountry || ""} onChange={set("passportCountry")}>
              <option value="">Select country</option>
              <option>India</option>
              <option>Pakistan</option>
              <option>Bangladesh</option>
              <option>Nepal</option>
              <option>Nigeria</option>
            </Select>
          </Field>
          <Field label="Passport Issue Date" required>
            <Input type="date" value={data.passportStart || ""} onChange={set("passportStart")} />
          </Field>
          <Field label="Passport Expiry Date" required>
            <Input type="date" value={data.passportEnd || ""} onChange={set("passportEnd")} />
          </Field>
        </div>
        <div className="as-info-box">
          ℹ️ Ensure passport has at least <strong>6 months validity</strong> from the intended study start date.
        </div>
      </div>

      {/*<div className="as-card">
        <SectionHeader icon="🪪" title="Additional Identity" />
        <div className="as-grid-2">
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

// ─── Step 4: Education ─────────────────────────────────────────────────────────
const StepEducation = ({ data, setData }) => {
  const set = (k) => (e) => setData({ ...data, [k]: e.target.value });
  const toggle = (k) => setData({ ...data, [k]: !data[k] });

  const quals = data.qualifications || [];
  const [currentQual, setCurrentQual] = useState({ scoreType: "Percentage" });

  const setQ = (k) => (e) => setCurrentQual({ ...currentQual, [k]: e.target.value });
  const toggleQ = (k) => setCurrentQual({ ...currentQual, [k]: !currentQual[k] });

  const saveQual = () => {
    if (currentQual.eduLevel && currentQual.boardCountry) {
      setData({ ...data, qualifications: [...quals, { ...currentQual, id: Date.now() }] });
      setCurrentQual({ scoreType: "Percentage" });
    } else {
      alert("Please fill required fields (Level, Country) to add.");
    }
  };

  const testTypes = ["IELTS", "TOEFL", "PTE", "Duolingo", "SAT", "GRE", "GMAT", "Other"];

  return (
    <div className="as-step-content">
      <div className="as-step-intro">
        <h2>Education Background</h2>
        <p>Academic history, proficiency scores and work experience.</p>
      </div>

      {quals.length > 0 && (
        <div className="as-apps-list" style={{ marginBottom: "0.5rem" }}>
          {quals.map((q, i) => (
            <div key={q.id} className="as-app-chip">
              <span className="as-app-num">Qual #{i + 1}</span>
              <span className="as-app-name">{q.eduLevel}</span>
              <span className="as-app-course">{q.courseName || q.boardName}</span>
              <span className="as-app-intake">{q.score ? `${q.score} ${q.scoreType}` : ""}</span>
              <button className="as-doc-remove" onClick={() => setData({ ...data, qualifications: quals.filter((x) => x.id !== q.id) })}>✕</button>
            </div>
          ))}
        </div>
      )}

      <div className="as-card">
        <SectionHeader
          icon="🎓"
          title="Academic Qualification"
          action={<button className="as-btn-secondary" onClick={saveQual}>+ Add Qualification</button>}
        />
        <div className="as-grid-2">
          <Field label="Highest Education Level" required>
            <Select value={currentQual.eduLevel || ""} onChange={setQ("eduLevel")}>
              <option value="">Select level</option>
              <option>High School (10th)</option>
              <option>Senior Secondary (12th)</option>
              <option>Diploma</option>
              <option>Bachelor's Degree</option>
              <option>Master's Degree</option>
              <option>PhD</option>
            </Select>
          </Field>
          <Field label="Board / University Country" required>
            <Select value={currentQual.boardCountry || ""} onChange={setQ("boardCountry")}>
              <option value="">Select country</option>
              <option>India</option>
              <option>Pakistan</option>
              <option>Bangladesh</option>
              <option>Nepal</option>
              <option>Other</option>
            </Select>
          </Field>
          <Field label="Board / University Name" required>
            <Input placeholder="e.g. CBSE, Osmania University" value={currentQual.boardName || ""} onChange={setQ("boardName")} />
          </Field>
          <Field label="Course / Degree Name">
            <Input placeholder="e.g. B.Tech Computer Science" value={currentQual.courseName || ""} onChange={setQ("courseName")} />
          </Field>
          <Field label="Start Date">
            <Input type="date" value={currentQual.eduStart || ""} onChange={setQ("eduStart")} />
          </Field>
          <Field label="End Date">
            <div className="as-end-date-row">
              <Input type="date" value={currentQual.eduEnd || ""} onChange={setQ("eduEnd")} disabled={currentQual.pursuing} />
              <label className="as-checkbox-label">
                <input type="checkbox" checked={currentQual.pursuing || false} onChange={() => toggleQ("pursuing")} />
                Currently pursuing
              </label>
            </div>
          </Field>
        </div>

        <div className="as-score-section">
          <label className="as-label">Score Type <span className="as-req">*</span></label>
          <div className="as-score-tabs">
            {["Percentage", "Grade", "GPA", "Other"].map((t) => (
              <button key={t} className={`as-score-tab ${currentQual.scoreType === t ? "active" : ""}`} onClick={() => setCurrentQual({ ...currentQual, scoreType: t })}>
                {t}
              </button>
            ))}
          </div>
          <Input
            placeholder={`Enter ${currentQual.scoreType}`}
            value={currentQual.score || ""}
            onChange={setQ("score")}
            style={{ marginTop: "0.75rem" }}
          />
        </div>
      </div>

      <div className="as-card">
        <SectionHeader icon="📊" title="Proficiency Test Scores" />
        <div className="as-yesno-toggle">
          <span>Does the student have proficiency test scores?</span>
          <RadioGroup
            name="hasTest"
            options={[{ value: "yes", label: "Yes" }, { value: "no", label: "No" }]}
            value={data.hasTest || "no"}
            onChange={(v) => setData({ ...data, hasTest: v })}
          />
        </div>
        {data.hasTest === "yes" && (
          <div className="as-grid-2" style={{ marginTop: "1.25rem" }}>
            <Field label="Test Type" required>
              <Select value={data.testType || ""} onChange={set("testType")}>
                <option value="">Select test</option>
                {testTypes.map((t) => <option key={t}>{t}</option>)}
              </Select>
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
            <Field label="Speaking">
              <Input placeholder="Speaking score" value={data.testSpeak || ""} onChange={set("testSpeak")} />
            </Field>
          </div>
        )}
      </div>

      <div className="as-card">
        <SectionHeader icon="💼" title="Work Experience" />
        <div className="as-yesno-toggle">
          <span>Does the student have work experience?</span>
          <RadioGroup
            name="hasWork"
            options={[{ value: "yes", label: "Yes" }, { value: "no", label: "No" }]}
            value={data.hasWork || "no"}
            onChange={(v) => setData({ ...data, hasWork: v })}
          />
        </div>
        {data.hasWork === "yes" && (
          <div className="as-grid-2" style={{ marginTop: "1.25rem" }}>
            <Field label="Company Name" required>
              <Input placeholder="Employer / company name" value={data.company || ""} onChange={set("company")} />
            </Field>
            <Field label="Job Title / Designation" required>
              <Input placeholder="e.g. Software Engineer" value={data.jobTitle || ""} onChange={set("jobTitle")} />
            </Field>
            <Field label="From Date">
              <Input type="date" value={data.workFrom || ""} onChange={set("workFrom")} />
            </Field>
            <Field label="To Date">
              <Input type="date" value={data.workTo || ""} onChange={set("workTo")} disabled={data.currentJob} />
            </Field>
            <Field label="Job Description">
              <textarea className="as-textarea" placeholder="Brief description of responsibilities..." value={data.jobDesc || ""} onChange={set("jobDesc")} rows={3} />
            </Field>
          </div>
        )}
      </div>
    </div>
  );
};

// ─── Step 5: Study Preferences ─────────────────────────────────────────────────
const StepPreferences = ({ data, setData }) => {
  const set = (k) => (e) => setData({ ...data, [k]: e.target.value });
  const [destInput, setDestInput] = useState("");
  const destinations = data.destinations || [];
  const addDest = (val) => {
    if (val && !destinations.includes(val)) {
      setData({ ...data, destinations: [...destinations, val] });
      setDestInput("");
    }
  };
  const removeDest = (val) => setData({ ...data, destinations: destinations.filter((d) => d !== val) });

  const countries = ["UK", "USA", "Canada", "Australia", "Germany", "Ireland", "New Zealand", "France", "Netherlands", "Dubai"];
  const intakes = ["January", "May", "September", "October"];
  const levels = ["Certificate", "Diploma", "Foundation", "Undergraduate (UG)", "Postgraduate (PG)", "PhD / Doctorate"];

  return (
    <div className="as-step-content">
      <div className="as-step-intro">
        <h2>Study Preferences</h2>
        <p>Understand the student's study goals, destination choices and budget.</p>
      </div>

      <div className="as-card">
        <SectionHeader icon="🌍" title="Preferred Destinations" />
        <div className="as-tag-input-area">
          <div className="as-tags-container">
            {destinations.map((d) => <Tag key={d} label={d} onRemove={() => removeDest(d)} />)}
          </div>
          <div className="as-dest-grid">
            {countries.map((c) => (
              <button
                key={c}
                className={`as-dest-btn ${destinations.includes(c) ? "selected" : ""}`}
                onClick={() => destinations.includes(c) ? removeDest(c) : addDest(c)}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="as-card">
        <SectionHeader icon="📚" title="Program Preferences" />
        <div className="as-grid-2">
          <Field label="Academic Level" required>
            <Select value={data.acadLevel || ""} onChange={set("acadLevel")}>
              <option value="">Select level</option>
              {levels.map((l) => <option key={l}>{l}</option>)}
            </Select>
          </Field>
          <Field label="Field of Study / Subject">
            <Input placeholder="e.g. Computer Science, Business, Nursing" value={data.fieldStudy || ""} onChange={set("fieldStudy")} />
          </Field>
          <Field label="Preferred Intake" required>
            <Select value={data.intake || ""} onChange={set("intake")}>
              <option value="">Select intake</option>
              {intakes.map((i) => <option key={i}>{i}</option>)}
            </Select>
          </Field>
          <Field label="Preferred Year" required>
            <Select value={data.intakeYear || ""} onChange={set("intakeYear")}>
              <option value="">Select year</option>
              <option>2025</option>
              <option>2026</option>
              <option>2027</option>
            </Select>
          </Field>
        </div>
      </div>

      <div className="as-card">
        <SectionHeader icon="💰" title="Budget & Accommodation" />
        <div className="as-grid-2">
          <Field label="Annual Tuition Budget (USD)">
            <Select value={data.tuitionBudget || ""} onChange={set("tuitionBudget")}>
              <option value="">Select range</option>
              <option>Under $10,000</option>
              <option>$10,000 – $20,000</option>
              <option>$20,000 – $30,000</option>
              <option>$30,000 – $40,000</option>
              <option>Above $40,000</option>
            </Select>
          </Field>
          <Field label="Accommodation Preference">
            <Select value={data.accommodation || ""} onChange={set("accommodation")}>
              <option value="">Select preference</option>
              <option>University Hostel / Dormitory</option>
              <option>Shared Private Accommodation</option>
              <option>Homestay</option>
              <option>Independent / Private Flat</option>
              <option>No Preference</option>
            </Select>
          </Field>
        </div>
        <Field label="Additional Notes / Special Requirements">
          <textarea
            className="as-textarea"
            placeholder="Any special requirements, preferences or notes about the student's goals..."
            value={data.notes || ""}
            onChange={set("notes")}
            rows={3}
          />
        </Field>
      </div>
    </div >
  );
};

// ─── Step 6: Background & Visa ──────────────────────────────────────────────────
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
          <div key={e.id} className="as-app-chip" style={{ marginBottom: "0.5rem" }}>
            <span className="as-app-num">#{i + 1}</span>
            <span className="as-app-name">{e.visaCategory}</span>
            <span className="as-app-course">{e.country}</span>
            <span className="as-app-intake">{e.date}</span>
            <button className="as-doc-remove" onClick={() => remove(e.id)}>✕</button>
          </div>
        ))}
        <div className="as-visa-entry-form">
          <div className="as-grid-2" style={{ marginBottom: "0.75rem" }}>
            <Field label="Visa Type" required>
              <Select value={current.visaCategory} onChange={setC("visaCategory")}>
                <option value="">Select Visa Category</option>
                <option>Student Visa</option>
                <option>Tourist Visa</option>
                <option>Work Visa</option>
                <option>Business Visa</option>
                <option>Dependent Visa</option>
                <option>Other</option>
              </Select>
            </Field>
            <Field label="Country" required>
              <Select value={current.country} onChange={setC("country")}>
                <option value="">Select Country</option>
                <option>UK</option><option>USA</option><option>Canada</option>
                <option>Australia</option><option>Germany</option><option>Ireland</option>
                <option>New Zealand</option><option>France</option><option>Netherlands</option>
                <option>India</option><option>Other</option>
              </Select>
            </Field>
            <Field label="Date of Travel" required>
              <Input type="date" value={current.date} onChange={setC("date")} />
            </Field>
          </div>
          <Field label="Description" required>
            <textarea
              className="as-textarea"
              placeholder="Enter Visa description"
              value={current.description}
              onChange={setC("description")}
              rows={3}
            />
          </Field>
          <div className="as-app-actions" style={{ marginTop: "0.75rem" }}>
            <button className="as-btn-primary" style={{ fontSize: "0.8rem", padding: "0.4rem 1rem" }} onClick={save}>💾 Save</button>
            <button className="as-btn-ghost" style={{ fontSize: "0.8rem", padding: "0.4rem 1rem", color: "#e53e3e" }} onClick={() => setCurrent({ visaCategory: "", country: "", date: "", description: "" })}>🗑 Remove</button>
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
          <div key={e.id} className="as-app-chip" style={{ marginBottom: "0.5rem" }}>
            <span className="as-app-num">#{i + 1}</span>
            <span className="as-app-name">From: {e.fromDate}</span>
            <span className="as-app-intake">To: {e.endDate}</span>
            <button className="as-doc-remove" onClick={() => remove(e.id)}>✕</button>
          </div>
        ))}
        <div className="as-visa-entry-form">
          <div className="as-grid-2" style={{ marginBottom: "0.75rem" }}>
            <Field label="From Date" required>
              <Input type="date" value={current.fromDate} onChange={setC("fromDate")} />
            </Field>
            <Field label="To Date" required>
              <Input type="date" value={current.endDate} onChange={setC("endDate")} />
            </Field>
          </div>
          <div className="as-app-actions" style={{ marginTop: "0.75rem" }}>
            <button className="as-btn-primary" style={{ fontSize: "0.8rem", padding: "0.4rem 1rem" }} onClick={save}>💾 Save</button>
            <button className="as-btn-ghost" style={{ fontSize: "0.8rem", padding: "0.4rem 1rem", color: "#e53e3e" }} onClick={() => setCurrent({ fromDate: "", endDate: "" })}>🗑 Remove</button>
          </div>
        </div>
      </div>
    );
  };

  // Simple YesNo with textarea (for disability & criminal)
  const YesNo = ({ label, field, detail, detailLabel }) => (
    <div className="as-yesno-card">
      <div className="as-yesno-row">
        <span className="as-yesno-label">{label}</span>
        <RadioGroup
          name={field}
          options={[{ value: "yes", label: "Yes" }, { value: "no", label: "No" }]}
          value={data[field] || "no"}
          onChange={radio(field)}
        />
      </div>
      {data[field] === "yes" && detail && (
        <textarea
          className="as-textarea"
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
    <div className="as-yesno-card">
      <div className="as-yesno-row">
        <span className="as-yesno-label">{label}</span>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <RadioGroup
            name={field}
            options={[{ value: "yes", label: "Yes" }, { value: "no", label: "No" }]}
            value={data[field] || "no"}
            onChange={radio(field)}
          />
          {data[field] === "yes" && (
            <button
              className="as-btn-secondary"
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
    <div className="as-step-content">
      <div className="as-step-intro">
        <h2>Background & Visa History</h2>
        <p>Emergency contacts and background information required for applications.</p>
      </div>

      <div className="as-card">
        <SectionHeader icon="🆘" title="Emergency Contact" />
        <div className="as-yesno-toggle" style={{ marginBottom: "1rem" }}>
          <span>Does the student have an emergency contact?</span>
          <RadioGroup name="hasEmergency" options={[{ value: "yes", label: "Yes" }, { value: "no", label: "No" }]} value={data.hasEmergency || "no"} onChange={radio("hasEmergency")} />
        </div>
        {data.hasEmergency === "yes" && (
          <div className="as-grid-2">
            <Field label="Contact Name" required><Input placeholder="Full name" value={data.emgName || ""} onChange={set("emgName")} /></Field>
            <Field label="Relationship" required>
              <Select value={data.emgRelation || ""} onChange={set("emgRelation")}>
                <option value="">Select relation</option>
                <option>Parent</option><option>Sibling</option><option>Spouse</option><option>Guardian</option><option>Other</option>
              </Select>
            </Field>
            <Field label="Phone Number" required>
              <div className="as-phone-row">
                <Select value={data.emgCode || ""} onChange={set("emgCode")} style={{ width: "120px", flexShrink: 0 }}>
                  <option value="">+Code</option>
                  <option value="+91">🇮🇳 +91</option>
                  <option value="+92">🇵🇰 +92</option>
                  <option value="+1">🇺🇸 +1</option>
                  <option value="+44">🇬🇧 +44</option>
                </Select>
                <Input placeholder="Phone number" value={data.emgPhone || ""} onChange={set("emgPhone")} style={{ flex: 1 }} />
              </div>
            </Field>
            <Field label="Email Address"><Input type="email" placeholder="emergency@email.com" value={data.emgEmail || ""} onChange={set("emgEmail")} /></Field>
          </div>
        )}
      </div>

      <div className="as-card">
        <SectionHeader icon="🔍" title="Background Declarations" />
        <div className="as-declarations">

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

// ─── Step 7: Documents ─────────────────────────────────────────────────────────
const StepDocuments = ({ data, setData }) => {
  const [dragOver, setDragOver] = useState(false);
  const fileRef = useRef();
  const uploaded = data.files || [];

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

  const docTypes = [
    "Passport Copy", "Academic Transcripts", "Degree Certificate", "IELTS/PTE/TOEFL Score",
    "Statement of Purpose (SOP)", "Letter of Recommendation (LOR)", "CV / Resume",
    "Bank Statement", "Proof of Address", "Photo ID", "Work Experience Letter", "Other",
  ];

  return (
    <div className="as-step-content">
      <div className="as-step-intro">
        <h2>Documents Upload</h2>
        <p>Upload supporting documents for applications. Max 10MB per file. PDF, JPG, PNG accepted.</p>
      </div>

      <div className="as-card">
        <SectionHeader icon="📂" title="Upload Documents" />
        <Field label="Document Type" required>
          <Select value={data.docType || ""} onChange={(e) => setData({ ...data, docType: e.target.value })}>
            <option value="">Select document type</option>
            {docTypes.map((d) => <option key={d}>{d}</option>)}
          </Select>
        </Field>
        <div
          className={`as-dropzone ${dragOver ? "dragover" : ""}`}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => fileRef.current?.click()}
        >
          <input ref={fileRef} type="file" multiple style={{ display: "none" }} onChange={handleSelect} />
          <div className="as-dropzone-icon">📎</div>
          <p className="as-dropzone-text">Drag & drop files here, or <span>browse</span></p>
          <p className="as-dropzone-hint">PDF, DOC, JPG, PNG · Max 10MB per file</p>
        </div>

        {uploaded.length > 0 && (
          <div className="as-uploaded-list">
            <h4>Uploaded Documents</h4>
            {uploaded.map((f, i) => (
              <div key={i} className="as-uploaded-item">
                <span className="as-doc-icon">📄</span>
                <div className="as-doc-info">
                  <span className="as-doc-name">{f.name}</span>
                  <span className="as-doc-meta">{f.type} · {(f.size / 1024).toFixed(1)} KB</span>
                </div>
                <button className="as-doc-remove" onClick={() => setData({ ...data, files: uploaded.filter((_, j) => j !== i) })}>✕</button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="as-card as-doc-checklist-card">
        <SectionHeader icon="✅" title="Document Checklist" />
        <div className="as-doc-checklist">
          {docTypes.slice(0, 8).map((d) => {
            const done = uploaded.some((f) => f.type === d);
            return (
              <div key={d} className={`as-checklist-item ${done ? "done" : ""}`}>
                <span className="as-check-icon">{done ? "✓" : "○"}</span>
                {d}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// ─── Step 8: Application ────────────────────────────────────────────────────────
const StepApplication = ({ data, setData }) => {
  const set = (k) => (e) => setData({ ...data, [k]: e.target.value });
  const apps = data.apps || [];
  const [current, setCurrent] = useState({});

  const saveApp = () => {
    if (current.university && current.course) {
      setData({ ...data, apps: [...apps, { ...current, id: Date.now() }] });
      setCurrent({});
    }
  };

  const setC = (k) => (e) => setCurrent({ ...current, [k]: e.target.value });

  return (
    <div className="as-step-content">
      <div className="as-step-intro">
        <h2>Create Application</h2>
        <p>Add one or more university applications for this student. You can add multiple applications.</p>
      </div>

      {apps.length > 0 && (
        <div className="as-apps-list">
          {apps.map((a, i) => (
            <div key={a.id} className="as-app-chip">
              <span className="as-app-num">App #{i + 1}</span>
              <span className="as-app-name">{a.university}</span>
              <span className="as-app-course">{a.course}</span>
              <span className="as-app-intake">{a.intakeMonth} {a.intakeYear}</span>
              <button className="as-doc-remove" onClick={() => setData({ ...data, apps: apps.filter((x) => x.id !== a.id) })}>✕</button>
            </div>
          ))}
        </div>
      )}

      <div className="as-card">
        <SectionHeader
          icon="🏛️"
          title="New Application"
          action={<button className="as-btn-secondary">+ Add Another</button>}
        />
        <div className="as-grid-3">
          <Field label="Country To" required>
            <Select value={current.country || ""} onChange={setC("country")}>
              <option value="">Select country</option>
              <option>UK</option><option>USA</option><option>Canada</option>
              <option>Australia</option><option>Germany</option><option>Ireland</option>
              <option>New Zealand</option><option>France</option><option>Netherlands</option>
            </Select>
          </Field>
          <Field label="State / Province">
            <Select value={current.state || ""} onChange={setC("state")}>
              <option value="">Select state</option>
              <option>Ontario</option><option>British Columbia</option><option>Victoria</option>
              <option>New South Wales</option><option>England</option>
            </Select>
          </Field>
          <Field label="City">
            <Select value={current.city || ""} onChange={setC("city")}>
              <option value="">Select city</option>
              <option>London</option><option>Toronto</option><option>Sydney</option>
              <option>Melbourne</option><option>Dublin</option><option>Auckland</option>
            </Select>
          </Field>
          <Field label="Academic Level" required>
            <Select value={current.acadLevel || ""} onChange={setC("acadLevel")}>
              <option value="">Select level</option>
              <option>Undergraduate (UG)</option>
              <option>Postgraduate (PG)</option>
              <option>PhD / Doctorate</option>
              <option>Diploma</option>
              <option>Foundation</option>
            </Select>
          </Field>
          <Field label="Intake Month" required>
            <Select value={current.intakeMonth || ""} onChange={setC("intakeMonth")}>
              <option value="">Month</option>
              <option>January</option><option>May</option><option>September</option><option>October</option>
            </Select>
          </Field>
          <Field label="Intake Year" required>
            <Select value={current.intakeYear || ""} onChange={setC("intakeYear")}>
              <option value="">Year</option>
              <option>2025</option><option>2026</option><option>2027</option>
            </Select>
          </Field>
        </div>
        <div className="as-grid-2">
          <Field label="University" required>
            <Input placeholder="Search university name..." value={current.university || ""} onChange={setC("university")} />
          </Field>
          <Field label="Course / Program" required>
            <Input placeholder="Search course or program..." value={current.course || ""} onChange={setC("course")} />
          </Field>
        </div>
        <div className="as-grid-4">
          <Field label="First Year Fee"><Input placeholder="–" value={current.fee || ""} onChange={setC("fee")} /></Field>
          <Field label="Min Deposit"><Input placeholder="–" value={current.deposit || ""} onChange={setC("deposit")} /></Field>
          <Field label="Cost of Living"><Input placeholder="–" value={current.living || ""} onChange={setC("living")} /></Field>
          <Field label="Duration"><Input placeholder="e.g. 2 years" value={current.duration || ""} onChange={setC("duration")} /></Field>
        </div>
        <Field label="Scholarship Available">
          <Input placeholder="Scholarship details (if any)" value={current.scholarship || ""} onChange={setC("scholarship")} />
        </Field>
        <div className="as-app-actions">
          <button className="as-btn-primary" onClick={saveApp}>+ Save Application</button>
          <button className="as-btn-ghost" onClick={() => setCurrent({})}>Clear</button>
        </div>
      </div>

      <div className="as-card as-summary-card">
        <SectionHeader icon="📋" title="Submission Summary" />
        <div className="as-summary-meta">
          <div className="as-summary-item"><span>Student</span><strong>{data?.personal?.firstName || "—"} {data?.personal?.lastName || ""}</strong></div>
          <div className="as-summary-item"><span>Applications</span><strong>{apps.length} application(s)</strong></div>
          <div className="as-summary-item"><span>Status</span><strong className="as-status-badge">Draft</strong></div>
        </div>
        <div className="as-info-box">
          ✅ Review all tabs before final submission. You can save as draft and return later.
        </div>
      </div>
    </div>
  );
};

// ─── Combined Step Wrappers ───────────────────────────────────────────────────
const StepPersonalContactIdentity = ({ data, setData }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
    <StepPersonal data={data.personal || {}} setData={(d) => setData((prev) => ({ ...prev, personal: d }))} />
    <StepContact data={data.contact || {}} setData={(d) => setData((prev) => ({ ...prev, contact: d }))} />
    <StepPassport data={data.passport || {}} setData={(d) => setData((prev) => ({ ...prev, passport: d }))} />
  </div>
);

const StepPreferencesBackground = ({ data, setData }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
    <StepPreferences data={data.preferences || {}} setData={(d) => setData((prev) => ({ ...prev, preferences: d }))} />
    <StepBackground data={data.background || {}} setData={(d) => setData((prev) => ({ ...prev, background: d }))} />
  </div>
);

// ─── Main Component ─────────────────────────────────────────────────────────────
export default function AddStudent() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [fetchId, setFetchId] = useState("");

  const setStepData = (key) => (val) => setFormData((prev) => ({ ...prev, [key]: val }));

  const renderStep = () => {
    const d = formData;
    const s = setStepData;
    switch (step) {
      case 1: return <StepPersonalContactIdentity data={d} setData={setFormData} />;
      case 2: return <StepEducation data={d.education || {}} setData={s("education")} />;
      case 3: return <StepPreferencesBackground data={d} setData={setFormData} />;
      case 4: return <StepDocuments data={d.documents || {}} setData={s("documents")} />;
      case 5: return <StepApplication data={{ ...d.application, personal: d.personal } || {}} setData={s("application")} />;
      default: return null;
    }
  };

  const progress = Math.round(((step - 1) / (STEPS.length - 1)) * 100);

  return (
    <div className="as-root">
      {/* Top Bar */}
      <div className="as-topbar">
        <div className="as-breadcrumb">
          <span className="as-breadcrumb-link">Dashboard</span>
          <span className="as-breadcrumb-sep">›</span>
          {/* <span className="as-breadcrumb-link">Applications</span>
          <span className="as-breadcrumb-sep">›</span>*/}
          <span className="as-breadcrumb-current">Add Student</span>
        </div>
        <div className="as-fetch-area">
          <input
            className="as-fetch-input"
            placeholder="Fetch by Unique ID, Email or Passport No."
            value={fetchId}
            onChange={(e) => setFetchId(e.target.value)}
          />
          <button className="as-fetch-btn">Fetch Data</button>
        </div>
      </div>

      {/* Progress */}
      <div className="as-progress-bar-outer">
        <div className="as-progress-bar-inner" style={{ width: `${progress}%` }} />
      </div>

      {/* Body */}
      <div className="as-body">
        {/* Sidebar */}
        <aside className="as-sidebar">
          <div className="as-sidebar-brand">
            <div className="as-brand-icon">✈️</div>
            <div>
              <div className="as-brand-title">Student Profile</div>
              <div className="as-brand-sub">New Application</div>
            </div>
          </div>

          <nav className="as-steps-nav">
            {STEPS.map((s) => {
              const state = s.id < step ? "done" : s.id === step ? "active" : "pending";
              return (
                <button key={s.id} className={`as-step-btn ${state}`} onClick={() => setStep(s.id)}>
                  <div className="as-step-indicator">
                    {state === "done" ? <span className="as-step-check">✓</span> : <span className="as-step-num">{s.id}</span>}
                  </div>
                  <div className="as-step-meta">
                    <span className="as-step-label">{s.label}</span>
                    <span className="as-step-sub">{s.sub}</span>
                  </div>
                </button>
              );
            })}
          </nav>

          <div className="as-sidebar-footer">
            <div className="as-progress-label">{progress}% complete</div>
            <div className="as-progress-mini">
              <div className="as-progress-mini-fill" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </aside>

        {/* Main Form */}
        <main className="as-main">
          <div className="as-main-inner">
            {renderStep()}

            {/* Bottom Navigation */}
            <div className="as-nav-footer">
              {step > 1 && (
                <button className="as-nav-btn as-nav-prev" onClick={() => setStep((s) => s - 1)}>
                  ← Previous
                </button>
              )}
              <div className="as-nav-right">
                <button className="as-nav-btn as-nav-draft">Save as Draft</button>
                {step < STEPS.length ? (
                  <button className="as-nav-btn as-nav-next" onClick={() => setStep((s) => s + 1)}>
                    Save & Next →
                  </button>
                ) : (
                  <button className="as-nav-btn as-nav-submit">Submit Profile ✓</button>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
