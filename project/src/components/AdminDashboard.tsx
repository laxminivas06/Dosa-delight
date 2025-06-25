// components/AdminDashboard.tsx
import { useState, useEffect, useRef } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { motion } from 'framer-motion';
import { Trash2, ArrowLeft, ChevronUp, ChevronDown, Download, Printer, FileText } from 'lucide-react';
import * as XLSX from 'xlsx';
import { useReactToPrint } from 'react-to-print';
import jsPDF from 'jspdf';

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  date: string;
}

type SortField = 'name' | 'email' | 'date';
type SortDirection = 'asc' | 'desc';

const AdminDashboard = ({ onLogout }: { onLogout: () => void }) => {
  const { mode } = useTheme();
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [sortField, setSortField] = useState<SortField>('date');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const tableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/contacts');
        if (!response.ok) throw new Error('Failed to fetch submissions');
        const data = await response.json();
        setSubmissions(data);
      } catch (err) {
        setError('Failed to load submissions');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      setSubmissions(submissions.filter(sub => sub.id !== id));
    } catch (err) {
      console.error('Failed to delete submission:', err);
    }
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedSubmissions = [...submissions].sort((a, b) => {
    const compareValue = (field: SortField) => {
      if (field === 'date') {
        return new Date(a[field]).getTime() - new Date(b[field]).getTime();
      }
      return a[field].localeCompare(b[field]);
    };

    return sortDirection === 'asc' 
      ? compareValue(sortField)
      : -compareValue(sortField);
  });

  // Excel Export
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(sortedSubmissions.map(sub => ({
      Name: sub.name,
      Email: sub.email,
      Phone: sub.phone || 'N/A',
      Message: sub.message,
      Date: new Date(sub.date).toLocaleString()
    })));
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Submissions");
    XLSX.writeFile(workbook, "contact_submissions.xlsx");
  };

  // Print Functionality
  const handlePrint = useReactToPrint({
    contentRef: tableRef,
    pageStyle: `
      @page { size: auto; margin: 10mm; }
      @media print {
        body { -webkit-print-color-adjust: exact; }
        table { width: 100%; border-collapse: collapse; }
        th, td { border: 1px solid #ddd; padding: 8px; }
        th { background-color: ${mode === 'lovable' ? '#fce7f3' : '#ffedd5'} !important; }
        tr:nth-child(even) { background-color: #f2f2f2; }
      }
    `,
  });
const exportToPDF = () => {
  if (!tableRef.current) return;

  const pdf = new jsPDF('p', 'pt', 'a4');
  const pageWidth = pdf.internal.pageSize.getWidth();
  const margin = 40;
  const tableWidth = pageWidth - margin * 2;

  // Add title
  pdf.setFontSize(18);
  pdf.setTextColor(40);
  pdf.text('Contact Submissions', margin, margin + 20);

  // Create columns
  const columns = [
    { header: 'Name', dataKey: 'name', width: 80 },
    { header: 'Email', dataKey: 'email', width: 120 },
    { header: 'Phone', dataKey: 'phone', width: 80 },
    { header: 'Date', dataKey: 'date', width: 80 },
    { header: 'Message', dataKey: 'message', width: 150 }
  ];

  // Prepare data
  const data = sortedSubmissions.map(sub => ({
    name: sub.name,
    email: sub.email,
    phone: sub.phone || 'N/A',
    date: new Date(sub.date).toLocaleString(),
    message: sub.message.length > 50 ? sub.message.substring(0, 50) + '...' : sub.message
  }));

  // Add table
  pdf.setFontSize(10);
  pdf.setTextColor(0, 0, 0);
  
  // Table headers
  let y = margin + 40;
  if (mode === 'lovable') {
    pdf.setFillColor(252, 231, 243);
  } else {
    pdf.setFillColor(255, 237, 213);
  }
  pdf.rect(margin, y, tableWidth, 20, 'F');
  columns.forEach((col, i) => {
    pdf.text(col.header, margin + (i === 0 ? 5 : columns.slice(0, i).reduce((a, b) => a + b.width, 5)), y + 15, {
      align: 'left'
    });
  });

  // Table rows
  y += 20;
  data.forEach((row, rowIndex) => {
    if (y > pdf.internal.pageSize.getHeight() - 40) {
      pdf.addPage();
      y = margin;
      
      // Repeat header on new page
      if (mode === 'lovable') {
        pdf.setFillColor(252, 231, 243);
      } else {
        pdf.setFillColor(255, 237, 213);
      }
      pdf.rect(margin, y, tableWidth, 20, 'F');
      columns.forEach((col, i) => {
        pdf.text(col.header, margin + (i === 0 ? 5 : columns.slice(0, i).reduce((a, b) => a + b.width, 5)), y + 15, {
          align: 'left'
        });
      });
      y += 20;
    }

    // Alternate row colors
    if (rowIndex % 2 === 0) {
      pdf.setFillColor(242, 242, 242);
      pdf.rect(margin, y, tableWidth, 20, 'F');
    }

    // Row content
    let x = margin + 5;
    columns.forEach(col => {
      pdf.text(row[col.dataKey as keyof typeof row] || '', x, y + 15, {
        align: 'left',
        maxWidth: col.width - 10
      });
      x += col.width;
    });

    y += 20;
  });

  pdf.save('contact_submissions.pdf');
};
  

  return (
    <div className={`min-h-screen p-4 sm:p-6 ${
      mode === 'lovable'
        ? 'bg-gradient-to-b from-pink-50 to-purple-50'
        : 'bg-gradient-to-b from-gray-50 to-white'
    }`}>
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className={`text-2xl sm:text-3xl font-bold ${
            mode === 'lovable' ? 'text-gray-800' : 'text-gray-900'
          }`}>
            Contact Submissions
          </h1>
          <div className="flex space-x-2">
            <button
              onClick={exportToExcel}
              className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium ${
                mode === 'lovable'
                  ? 'bg-pink-100 text-pink-800 hover:bg-pink-200'
                  : 'bg-orange-100 text-orange-800 hover:bg-orange-200'
              }`}
              title="Export to Excel"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Excel</span>
            </button>
            <button
              onClick={exportToPDF}
              className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium ${
                mode === 'lovable'
                  ? 'bg-pink-100 text-pink-800 hover:bg-pink-200'
                  : 'bg-orange-100 text-orange-800 hover:bg-orange-200'
              }`}
              title="Export to PDF"
            >
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">PDF</span>
            </button>
            <button
              onClick={handlePrint}
              className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium ${
                mode === 'lovable'
                  ? 'bg-pink-100 text-pink-800 hover:bg-pink-200'
                  : 'bg-orange-100 text-orange-800 hover:bg-orange-200'
              }`}
              title="Print"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">Print</span>
            </button>
            <button
              onClick={onLogout}
              className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium ${
                mode === 'lovable'
                  ? 'bg-pink-100 text-pink-800 hover:bg-pink-200'
                  : 'bg-orange-100 text-orange-800 hover:bg-orange-200'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-300"></div>
          </div>
        ) : error ? (
          <div className={`p-4 rounded-lg ${
            mode === 'lovable'
              ? 'bg-pink-100 text-pink-800'
              : 'bg-orange-100 text-orange-800'
          }`}>
            {error}
          </div>
        ) : submissions.length === 0 ? (
          <div className={`p-8 text-center rounded-xl ${
            mode === 'lovable'
              ? 'bg-pink-50 text-pink-700'
              : 'bg-orange-50 text-orange-700'
          }`}>
            No submissions found
          </div>
        ) : (
          <div ref={tableRef}>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="overflow-x-auto"
            >
              <table className="w-full border-collapse">
                <thead>
                  <tr className={`${
                    mode === 'lovable' 
                      ? 'bg-pink-100 text-pink-800' 
                      : 'bg-orange-100 text-orange-800'
                  }`}>
                    <th 
                      className="p-3 text-left cursor-pointer"
                      onClick={() => handleSort('name')}
                    >
                      <div className="flex items-center">
                        Name
                        {sortField === 'name' && (
                          sortDirection === 'asc' ? 
                            <ChevronUp className="ml-1 w-4 h-4" /> : 
                            <ChevronDown className="ml-1 w-4 h-4" />
                        )}
                      </div>
                    </th>
                    <th 
                      className="p-3 text-left cursor-pointer"
                      onClick={() => handleSort('email')}
                    >
                      <div className="flex items-center">
                        Email
                        {sortField === 'email' && (
                          sortDirection === 'asc' ? 
                            <ChevronUp className="ml-1 w-4 h-4" /> : 
                            <ChevronDown className="ml-1 w-4 h-4" />
                        )}
                      </div>
                    </th>
                    <th className="p-3 text-left">Phone</th>
                    <th 
                      className="p-3 text-left cursor-pointer"
                      onClick={() => handleSort('date')}
                    >
                      <div className="flex items-center">
                        Date
                        {sortField === 'date' && (
                          sortDirection === 'asc' ? 
                            <ChevronUp className="ml-1 w-4 h-4" /> : 
                            <ChevronDown className="ml-1 w-4 h-4" />
                        )}
                      </div>
                    </th>
                    <th className="p-3 text-left">Message</th>
                    <th className="p-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedSubmissions.map((submission) => (
                    <motion.tr
                      key={submission.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                      className={`border-b ${
                        mode === 'lovable' 
                          ? 'border-pink-50 hover:bg-pink-50' 
                          : 'border-orange-50 hover:bg-orange-50'
                      }`}
                    >
                      <td className="p-3">{submission.name}</td>
                      <td className="p-3">
                        <a 
                          href={`mailto:${submission.email}`} 
                          className="hover:underline"
                        >
                          {submission.email}
                        </a>
                      </td>
                      <td className="p-3">
                        {submission.phone && (
                          <a 
                            href={`tel:${submission.phone}`} 
                            className="hover:underline"
                          >
                            {submission.phone}
                          </a>
                        )}
                      </td>
                      <td className="p-3 whitespace-nowrap">
                        {new Date(submission.date).toLocaleString()}
                      </td>
                      <td className="p-3 max-w-xs truncate">
                        <div className="truncate" title={submission.message}>
                          {submission.message}
                        </div>
                      </td>
                      <td className="p-3">
                        <button
                          onClick={() => handleDelete(submission.id)}
                          className={`p-2 rounded-full ${
                            mode === 'lovable'
                              ? 'text-pink-600 hover:bg-pink-100'
                              : 'text-orange-600 hover:bg-orange-100'
                          }`}
                          aria-label="Delete submission"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;