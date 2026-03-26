// Shared Supabase configuration
const SUPABASE_URL = 'https://waccmzdgooxothkejwiq.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndhY2NtemRnb294b3Roa2Vqd2lxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ0NTE2OTksImV4cCI6MjA5MDAyNzY5OX0.0cWa-UxKv1-DHGNIwT3SGYM_LVnc9HuMLCAGDbV039U';
const db = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// Subjects by class
const SUBJECTS_BY_CLASS = {
    '6': ['Telugu', 'Hindi', 'English', 'Maths', 'Science', 'Social'],
    '7': ['Telugu', 'Hindi', 'English', 'Maths', 'Science', 'Social'],
    '8': ['Telugu', 'Hindi', 'English', 'Maths', 'Physics', 'Biology', 'Social'],
    '9': ['Telugu', 'Hindi', 'English', 'Maths', 'Physics', 'Biology', 'Social'],
    '10': ['Telugu', 'Hindi', 'English', 'Maths', 'Physics', 'Biology', 'Social']
};

const ALL_SUBJECTS = ['Telugu', 'Hindi', 'English', 'Maths', 'Science', 'Physics', 'Biology', 'Social'];
const CLASSES = ['6', '7', '8', '9', '10'];
const SECTIONS = ['A', 'B', 'C'];
const EXAMS = [
    { value: 'FA1', label: 'FA1 - Formative 1', maxMarks: 20 },
    { value: 'FA2', label: 'FA2 - Formative 2', maxMarks: 20 },
    { value: 'SA1', label: 'SA1 - Summative 1', maxMarks: 80 },
    { value: 'FA3', label: 'FA3 - Formative 3', maxMarks: 20 },
    { value: 'FA4', label: 'FA4 - Formative 4', maxMarks: 20 },
    { value: 'SA2', label: 'SA2 - Summative 2', maxMarks: 80 }
];

function getSession(role) {
    const s = JSON.parse(localStorage.getItem('school_session'));
    if (!s || (role && s.role !== role)) {
        window.location.href = 'index.html';
        return null;
    }
    return s;
}

function logout() {
    localStorage.removeItem('school_session');
    window.location.href = 'index.html';
}

function calculateGrade(marks, maxMarks) {
    const pct = (marks / maxMarks) * 100;
    if (pct >= 90) return { grade: 'A+', cls: 'grade-ap' };
    if (pct >= 80) return { grade: 'A', cls: 'grade-a' };
    if (pct >= 70) return { grade: 'B', cls: 'grade-b' };
    if (pct >= 60) return { grade: 'C', cls: 'grade-c' };
    if (pct >= 40) return { grade: 'D', cls: 'grade-d' };
    return { grade: 'F', cls: 'grade-f' };
}

function getExamMaxMarks(examType) {
    const e = EXAMS.find(x => x.value === examType);
    return e ? e.maxMarks : 20;
}

function formatDate(dateStr) {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}
