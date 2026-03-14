import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  FileText, 
  Send, 
  History, 
  PlusCircle, 
  Search, 
  AlertTriangle, 
  CheckCircle,
  Download,
  Mail,
  Phone,
  Building2,
  User,
  Clock,
  Upload,
  Settings,
  X,
  FileSpreadsheet
} from 'lucide-react';
import { jsPDF } from 'jspdf';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { cn } from './lib/utils';
import { Unit, Notification, OCCURRENCE_TYPES, TEMPLATE_MODELS } from './types';
import { getNotificationTemplate } from './templates';

export default function App() {
  const [units, setUnits] = useState<Unit[]>([]);
  const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);
  const [history, setHistory] = useState<Notification[]>([]);
  const [occurrenceType, setOccurrenceType] = useState(OCCURRENCE_TYPES[0]);
  const [templateType, setTemplateType] = useState(TEMPLATE_MODELS[0].id);
  const [occurrenceDate, setOccurrenceDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [advertenciaDate, setAdvertenciaDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [description, setDescription] = useState('');
  const [evidencePhoto, setEvidencePhoto] = useState<string | null>(null);
  const [letterhead, setLetterhead] = useState<string | null>(localStorage.getItem('letterhead'));
  const [signature, setSignature] = useState<string | null>(localStorage.getItem('signature'));
  const [showSettings, setShowSettings] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [showImportModal, setShowImportModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showConfirmSend, setShowConfirmSend] = useState(false);
  const [ccSindico, setCcSindico] = useState(true);
  const [ccAdmin, setCcAdmin] = useState(true);
  const [showEditUnitModal, setShowEditUnitModal] = useState(false);
  const [editingUnit, setEditingUnit] = useState<Unit | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchUnits();
  }, []);

const fetchUnits = () => {
      const stored = localStorage.getItem('palace_units');
      const data = stored ? JSON.parse(stored) : [];
      setUnits(data);
};

const fetchHistory = (unitId: number) => {
      const stored = localStorage.getItem('palace_notifications');
          const all: any[] = stored ? JSON.parse(stored) : [];
              setHistory(all.filter((n: any) => n.unit_id === unitId).sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime()));
                };
}
  const handleUnitSelect = (unit: Unit) => {
    setSelectedUnit(unit);
    fetchHistory(unit.id);
    setStatusMessage(null);
  };

  const filteredUnits = useMemo(() => {
    return units.filter(u => 
      u.unit_number.includes(searchTerm) || 
      u.owner_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.block.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [units, searchTerm]);

  // Auto-suggest template based on history
  useEffect(() => {
    if (!selectedUnit) return;
    
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    
    const hasRecent = history.some(n => 
      n.type === occurrenceType && 
      new Date(n.date) > sixMonthsAgo
    );

    if (occurrenceType === 'Outras') {
      setTemplateType('outros');
    } else if (occurrenceType === 'Barulho / Perturbação') {
      setTemplateType(hasRecent ? 'multa_barulho' : 'advertencia_barulho');
    } else if (occurrenceType === 'Trânsito de bicicletas em área proibida') {
      setTemplateType(hasRecent ? 'multa_bicicletas' : 'advertencia_bicicletas');
    } else if (occurrenceType === 'Estacionamento irregular') {
      setTemplateType(hasRecent ? 'multa_estacionamento' : 'advertencia_estacionamento');
    } else if (occurrenceType === 'Animal em área proibida') {
      setTemplateType(hasRecent ? 'multa_gramada' : 'advertencia_gramada');
    } else if (occurrenceType === 'Roupas na varanda') {
      setTemplateType(hasRecent ? 'multa_roupas_varanda' : 'advertencia_roupas_varanda');
    } else if (occurrenceType === 'Objetos no corredor/hall') {
      setTemplateType(hasRecent ? 'multa_objetos_corredor' : 'advertencia_objetos_corredor');
    } else if (occurrenceType === 'Dejetos de pet') {
      setTemplateType(hasRecent ? 'multa_dejetos' : 'advertencia_dejetos');
    } else if (hasRecent) {
      setTemplateType('multa');
    } else {
      setTemplateType('advertencia');
    }
  }, [history, occurrenceType, selectedUnit]);

  const generatePDF = (unit: Unit, type: string, desc: string, tType: string, occDate: string) => {
    const doc = new jsPDF();
    const dateStr = format(new Date(), "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
    const occDateFormatted = format(new Date(occDate + 'T12:00:00'), "dd/MM/yyyy");
    const advDateFormatted = format(new Date(advertenciaDate + 'T12:00:00'), "dd/MM/yyyy");

    const fullName = unit.legal_name || unit.owner_name;
    const secondaryName = (unit.owner_name && unit.legal_name && unit.owner_name !== unit.legal_name) ? unit.owner_name : null;

    const getBody = () => {
      return getNotificationTemplate(tType, unit, occDateFormatted, advDateFormatted, desc, type);
    };

    const drawHeader = () => {
      if (letterhead) {
        doc.addImage(letterhead, 'PNG', 0, 0, 210, 297);
      } else {
        doc.setFontSize(20);
        doc.setTextColor(40, 40, 40);
        doc.text("MARCOS SHALOM DA SILVA LOPES", 105, 20, { align: 'center' });
        doc.setFontSize(10);
        doc.text("OAB/CE 48.982 | Assessoria Jurídica Condominial", 105, 28, { align: 'center' });
        doc.line(20, 32, 190, 32);
      }
    };

    drawHeader();

    // Content
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.text(`Fortaleza, ${dateStr}`, 20, 55);

    doc.setFont("helvetica", "bold");
    const isMulta = tType.startsWith('multa');
    const title = isMulta ? 'MULTA' : 'ADVERTÊNCIA';
    doc.text(`NOTIFICAÇÃO EXTRAJUDICIAL - ${title}`, 105, 70, { align: 'center' });
    
    doc.setFont("helvetica", "normal");
    doc.text(`Ao Sr(a). ${fullName}`, 20, 85);
    let currentY = 115;
    if (secondaryName) {
      doc.text(`(${secondaryName})`, 20, 91);
      doc.text(`Unidade: ${unit.unit_number} - Bloco: ${unit.block}`, 20, 99);
      doc.text(`Condomínio Palace de France II`, 20, 106);
      currentY = 121;
    } else {
      doc.text(`Unidade: ${unit.unit_number} - Bloco: ${unit.block}`, 20, 93);
      doc.text(`Condomínio Palace de France II`, 20, 100);
      currentY = 115;
    }
    const margin = 20;
    const contentWidth = 170;

    const addText = (text: string, isBold = false, align: 'left' | 'justify' = 'justify') => {
      const paragraphs = text.split('\n');
      
      paragraphs.forEach(para => {
        // Check if this paragraph should be bold (Chapter or Article)
        const shouldBeBold = isBold || para.trim().startsWith('CAPÍTULO') || para.trim().startsWith('Art.');
        doc.setFont("helvetica", shouldBeBold ? "bold" : "normal");

        const lines = doc.splitTextToSize(para.trim(), contentWidth);
        if (lines.length === 0) {
          currentY += 4;
          return;
        }
        lines.forEach((line: string, i: number) => {
          if (currentY > 275) {
            doc.addPage();
            drawHeader();
            currentY = 50;
            doc.setFont("helvetica", shouldBeBold ? "bold" : "normal");
          }
          const isLastLine = i === lines.length - 1;
          doc.text(line, margin, currentY, { 
            align: (align === 'justify' && !isLastLine) ? 'justify' : 'left', 
            maxWidth: contentWidth 
          });
          currentY += 6;
        });
        currentY += 4; // Space between paragraphs
      });
    };

    addText(getBody());

    if (desc) {
      currentY += 5;
      addText("Detalhes da ocorrência:", true);
      addText(desc);
    }

    currentY += 10;
    if (currentY > 240) {
      doc.addPage();
      drawHeader();
      currentY = 50;
    }

    doc.setFont("helvetica", "normal");
    doc.text("Cordialmente,", 20, currentY);
    
    if (signature) {
      doc.addImage(signature, 'PNG', 20, currentY + 5, 50, 20);
    }
    
    doc.setFont("helvetica", "bold");
    doc.text("Marcos Shalom da Silva Lopes", 20, currentY + 30);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("OAB/CE 48.982", 20, currentY + 35);
    doc.text("Assessoria Jurídica do Condomínio Residencial Palace de France II", 20, currentY + 40);

    return doc;
  };

  const handleSend = async () => {
    if (!selectedUnit) return;
    setLoading(true);
    setStatusMessage(null);
    setShowConfirmSend(false);

    try {
      const doc = generatePDF(selectedUnit, occurrenceType, description, templateType, occurrenceDate);
      const pdfBase64 = doc.output('datauristring');

      // 1. Save to DB
      const saveRes = await fetch('/api/notifications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          unit_id: selectedUnit.id,
          type: occurrenceType,
          description,
          template_type: templateType,
          occurrence_date: occurrenceDate
        })
      });

      if (!saveRes.ok) throw new Error("Failed to save notification");

      // 2. Send Email
      const occDateFormatted = format(new Date(occurrenceDate + 'T12:00:00'), "dd/MM/yyyy");
      const isMulta = templateType.startsWith('multa');
      const fullName = selectedUnit.legal_name || selectedUnit.owner_name;
      
      let emailHtml = `
        <p>Ao sr.(a) ${fullName},</p>
        <p>Telefone ${selectedUnit.phones}</p>
        <p>Segue em anexo notificação referente à infração às normas condominiais referente à sua unidade ${selectedUnit.unit_number}-${selectedUnit.block} do Condomínio Palace de France II, ocorrida em ${occDateFormatted}.</p>
      `;

      if (isMulta && ccAdmin) {
        emailHtml += `
          <p><strong>À Administradora Condominial:</strong> Favor incluir a multa correspondente no boleto da unidade supracitada, após confirmação da aplicação com a síndica. Segue em anexo a prova da infração.</p>
        `;
      }

      emailHtml += `
        <br>
        <p>Cordialmente,</p>
        <p><strong>Marcos Shalom da Silva Lopes</strong><br>
        OAB/CE 48.982<br>
        Assessoria Jurídica Condominial<br>
        Condomínio Residencial Palace de France II</p>
      `;

      const ccList = [];
      if (ccSindico) ccList.push('palacedefrance995@gmail.com');
      if (isMulta && ccAdmin) ccList.push('doc01.ce@newpred.com');

      const emailRes = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: selectedUnit.emails,
          cc: ccList.join(', '),
          subject: `Notificação Extrajudicial - Unidade ${selectedUnit.unit_number}-${selectedUnit.block}`,
          html: emailHtml,
          attachmentBase64: pdfBase64,
          filename: `Notificacao_${selectedUnit.unit_number}_${selectedUnit.block}.pdf`,
          evidencePhoto: evidencePhoto
        })
      });

      const emailData = await emailRes.json();
      
      if (emailRes.ok) {
        setStatusMessage({ type: 'success', text: 'Notificação enviada com sucesso!' });
        fetchHistory(selectedUnit.id);
        setDescription('');
        setEvidencePhoto(null);
      } else {
        setStatusMessage({ type: 'error', text: emailData.error || 'Erro ao enviar e-mail.' });
      }

    } catch (err) {
      console.error(err);
      setStatusMessage({ type: 'error', text: 'Ocorreu um erro inesperado.' });
    } finally {
      setLoading(false);
    }
  };

  const downloadPreview = () => {
    if (!selectedUnit) return;
    const doc = generatePDF(selectedUnit, occurrenceType, description, templateType, occurrenceDate);
    doc.save(`Notificacao_${selectedUnit.unit_number}_${selectedUnit.block}.pdf`);
  };

const handleUpdateUnit = (e: React.FormEvent) => {
      e.preventDefault();
          if (!editingUnit) return;
              try {
                    const stored = localStorage.getItem('palace_units');
                          const units_data: any[] = stored ? JSON.parse(stored) : [];
                                const idx = units_data.findIndex((u: any) => u.id === editingUnit.id);
                                      if (idx !== -1) {
                                                units_data[idx] = editingUnit;
                                                        localStorage.setItem('palace_units', JSON.stringify(units_data));
                                                                fetchUnits();
                                                                        if (selectedUnit?.id === editingUnit.id) {
                                                                                  setSelectedUnit(editingUnit);
                                                                                          }
                                                                                                  setShowEditUnitModal(false);
                                                                                                          setEditingUnit(null);
                                                                                                                }
                                                                                                                    } catch (err) {
                                                                                                                          console.error(err);
                                                                                                                                alert("Erro ao atualizar unidade.");
                                                                                                                                    }
                                                                                                                                      };
                                      }
}
  const handleFileUpload = async (file: File) => {
    setLoading(true);
    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const text = (event.target?.result as string).replace(/^\uFEFF/, '');
        const lines = text.split(/\r?\n/).filter(l => l.trim());
        
        // Find the header row
        let headerIndex = lines.findIndex(line => {
          const l = line.toLowerCase();
          // Look for rows that have at least 3 of our key columns
          const matches = [
            l.includes('unidade'),
            l.includes('bloco'),
            l.includes('nome'),
            l.includes('email'),
            l.includes('telefone')
          ].filter(Boolean).length;
          return matches >= 3;
        });

        if (headerIndex === -1) {
          // Fallback to previous logic if strict check fails
          headerIndex = lines.findIndex(line => 
            line.toLowerCase().includes('unidade') &&
                        line.toLowerCase().includes('bloco')
          );
        }

        if (headerIndex === -1) {
          alert("Não foi possível encontrar o cabeçalho na planilha. Certifique-se de que a planilha contém colunas como 'Unidade' e 'Nome'.");
          setLoading(false);
          return;
        }

        const delimiter = lines[headerIndex].includes(';') ? ';' : ',';
        
        const parseCSVLine = (line: string, delim: string) => {
          let text = line.trim();
          // Handle the case where the entire line is wrapped in quotes (common in some exports)
          if (text.startsWith('"') && text.endsWith('"')) {
            const inner = text.slice(1, -1);
            // Heuristic: if unwrapping reveals the delimiter, it was likely a quoted line
            if (inner.includes(delim)) {
              // In a whole-quoted line, internal quotes are escaped as ""
              text = inner.replace(/""/g, '"');
            }
          }

          const result = [];
          let cur = '';
          let inQuote = false;
          for (let i = 0; i < text.length; i++) {
            const char = text[i];
            if (char === '"') {
              if (inQuote && text[i + 1] === '"') {
                // Escaped quote inside a quoted field
                cur += '"';
                i++;
              } else {
                inQuote = !inQuote;
              }
            } else if (char === delim && !inQuote) {
              result.push(cur.trim());
              cur = '';
            } else {
              cur += char;
            }
          }
          result.push(cur.trim());
          return result;
        };

        const headers = parseCSVLine(lines[headerIndex], delimiter).map(h => h.trim().toLowerCase());
        
        const data = lines.slice(headerIndex + 1).map(line => {
          const values = parseCSVLine(line, delimiter);
          const obj: any = {};
          headers.forEach((header, i) => {
            if (header) obj[header] = values[i] || '';
          });
          return obj;
        }).filter(obj => Object.values(obj).some(v => v !== ''));

        const res = await fetch('/api/units/import', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ data })
        });
        if (res.ok) {
          alert("Importação de " + data.length + " unidades concluída com sucesso!");
          fetchUnits();
          setShowImportModal(false);
          setSelectedFile(null);
        } else {
          const errData = await res.json();
          alert("Erro na importação: " + (errData.error || "Erro desconhecido"));
        }
      } catch (err) {
        console.error(err);
        alert("Erro ao processar o arquivo. Certifique-se de que é um CSV válido.");
      } finally {
        setLoading(false);
      }
    };
    // Use ISO-8859-1 for better compatibility with Brazilian Excel CSVs
    reader.readAsText(file, 'ISO-8859-1');
  };

  const seedDatabase = async () => {
    await fetch('/api/units/seed', { method: 'POST' });
    fetchUnits();
  };

  const handleAssetUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'letterhead' | 'signature') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        if (type === 'letterhead') {
          setLetterhead(base64String);
          localStorage.setItem('letterhead', base64String);
        } else {
          setSignature(base64String);
          localStorage.setItem('signature', base64String);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEvidencePhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-[#F3F4F6] text-[#1F2937] font-sans p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-[#0056b3] rounded-2xl flex items-center justify-center shadow-lg shadow-blue-200">
              <Building2 className="text-white" size={32} />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-[#111827]">
                Palace de France II
              </h1>
              <p className="text-gray-500 font-medium">Assessoria Jurídica Condominial</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => setShowImportModal(true)}
              className="px-5 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50 transition-all flex items-center gap-2 shadow-sm"
            >
              <Upload size={18} />
              Importar Planilha
            </button>
            <button 
              onClick={() => setShowSettings(true)}
              className="p-2.5 bg-white border border-gray-200 rounded-xl text-gray-400 hover:text-gray-600 transition-all shadow-sm"
            >
              <Settings size={20} />
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar: Unit Selection */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
              <div className="relative mb-6">
                <input 
                  type="text" 
                  placeholder="Buscar por unidade, bloco ou nome..." 
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#0056b3] transition-all text-sm font-medium"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
              </div>

              <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                {filteredUnits.map(unit => (
                  <div
                    key={unit.id}
                    onClick={() => handleUnitSelect(unit)}
                    className={cn(
                      "w-full text-left p-5 rounded-2xl transition-all border-2 cursor-pointer",
                      selectedUnit?.id === unit.id 
                        ? "bg-[#F0F7FF] border-[#0056b3] shadow-md shadow-blue-50" 
                        : "bg-white border-transparent hover:bg-gray-50 hover:border-gray-200"
                    )}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-black text-xl text-[#111827]">
                        {unit.unit_number} <span className="text-[#0056b3] text-sm font-bold ml-1">BL {unit.block}</span>
                      </span>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingUnit(unit);
                          setShowEditUnitModal(true);
                        }}
                        className="p-1.5 text-gray-400 hover:text-[#0056b3] hover:bg-white rounded-lg transition-all"
                        title="Editar dados da unidade"
                      >
                        <Settings size={14} />
                      </button>
                    </div>
                    <div className="text-sm font-semibold text-gray-600 flex items-center gap-2">
                      <User size={14} className="text-gray-400" /> {unit.legal_name || unit.owner_name}
                    </div>
                  </div>
                ))}
                {filteredUnits.length === 0 && (
                  <div className="text-center py-12 text-gray-400 italic bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                    <FileSpreadsheet className="mx-auto mb-2 opacity-20" size={40} />
                    Nenhuma unidade encontrada.
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Main Content: Form and History */}
          <div className="lg:col-span-8 space-y-8">
            {selectedUnit ? (
              <>
                {/* Notification Form */}
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-10">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
                    <h2 className="text-2xl font-black text-[#111827] flex items-center gap-3">
                      <PlusCircle className="text-[#0056b3]" size={28} />
                      Nova Notificação
                    </h2>
                    <div className="flex bg-gray-100 p-1 rounded-xl">
                      {TEMPLATE_MODELS.map(model => (
                        <button
                          key={model.id}
                          onClick={() => setTemplateType(model.id)}
                          className={cn(
                            "px-4 py-2 rounded-lg text-xs font-bold transition-all",
                            templateType === model.id 
                              ? "bg-white text-[#0056b3] shadow-sm" 
                              : "text-gray-500 hover:text-gray-700"
                          )}
                        >
                          {model.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div className="space-y-3">
                      <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Tipo de Ocorrência</label>
                      <select 
                        className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#0056b3] font-bold text-gray-700 appearance-none"
                        value={occurrenceType}
                        onChange={(e) => setOccurrenceType(e.target.value)}
                      >
                        {OCCURRENCE_TYPES.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-3">
                      <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Modelo de Notificação</label>
                      <select 
                        className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#0056b3] font-bold text-gray-700 appearance-none"
                        value={templateType}
                        onChange={(e) => setTemplateType(e.target.value)}
                      >
                        {TEMPLATE_MODELS.map(model => (
                          <option key={model.id} value={model.id}>{model.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div className="space-y-3">
                      <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Data da Ocorrência</label>
                      <input 
                        type="date"
                        className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#0056b3] font-bold text-gray-700"
                        value={occurrenceDate}
                        onChange={(e) => setOccurrenceDate(e.target.value)}
                      />
                    </div>
                    {templateType.startsWith('multa') && templateType !== 'multa' && (
                      <div className="space-y-3">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Data da Advertência Anterior</label>
                        <input 
                          type="date"
                          className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#0056b3] font-bold text-gray-700"
                          value={advertenciaDate}
                          onChange={(e) => setAdvertenciaDate(e.target.value)}
                        />
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div className="space-y-3">
                      <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Destinatário</label>
                      <div className="p-4 bg-gray-50 rounded-2xl text-gray-800 font-bold flex items-center gap-3">
                        <User size={18} className="text-[#0056b3]" />
                        {selectedUnit.owner_name}
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Foto da Ocorrência (Opcional)</label>
                      <div className="flex items-center gap-4">
                        <div className="flex-1">
                          <input 
                            type="file" 
                            accept="image/*"
                            onChange={handlePhotoUpload}
                            className="hidden" 
                            id="photo-upload"
                          />
                          <label 
                            htmlFor="photo-upload"
                            className="flex items-center justify-center gap-2 p-4 border-2 border-dashed border-gray-200 rounded-2xl cursor-pointer hover:border-[#0056b3] hover:bg-blue-50/30 transition-all group"
                          >
                            <Upload size={20} className="text-gray-400 group-hover:text-[#0056b3]" />
                            <span className="text-sm font-bold text-gray-600">
                              {evidencePhoto ? "Alterar Foto" : "Carregar Foto"}
                            </span>
                          </label>
                        </div>
                        {evidencePhoto && (
                          <div className="relative w-16 h-16 rounded-xl border border-gray-200 overflow-hidden bg-gray-50 flex items-center justify-center group">
                            <img src={evidencePhoto} className="max-w-full max-h-full object-contain" alt="Preview" />
                            <button 
                              onClick={() => setEvidencePhoto(null)}
                              className="absolute inset-0 bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                            >
                              <X size={16} />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 mb-10">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Descrição Adicional</label>
                    <textarea 
                      rows={4}
                      className="w-full p-5 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#0056b3] font-medium text-gray-700 placeholder:text-gray-300"
                      placeholder="Descreva os detalhes da ocorrência (data, hora, local exato)..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>

                  {statusMessage && (
                    <div className={cn(
                      "mb-8 p-5 rounded-2xl flex items-center gap-4 animate-in fade-in slide-in-from-top-2",
                      statusMessage.type === 'success' ? "bg-green-50 text-green-700 border border-green-100" : "bg-red-50 text-red-700 border border-red-100"
                    )}>
                      {statusMessage.type === 'success' ? <CheckCircle size={24} /> : <AlertTriangle size={24} />}
                      <span className="font-bold">{statusMessage.text}</span>
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row gap-4">
                    <button 
                      onClick={() => setShowConfirmSend(true)}
                      disabled={loading}
                      className="flex-[2] bg-[#0056b3] text-white py-5 px-8 rounded-2xl font-black text-lg flex items-center justify-center gap-3 hover:bg-[#004494] transition-all disabled:opacity-50 shadow-xl shadow-blue-100 active:scale-95"
                    >
                      {loading ? (
                        <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          <Send size={22} />
                          Gerar e Enviar Notificação
                        </>
                      )}
                    </button>
                    <button 
                      onClick={downloadPreview}
                      className="flex-1 px-8 py-5 border-2 border-gray-100 rounded-2xl font-black text-gray-600 hover:bg-gray-50 transition-all flex items-center justify-center gap-3 active:scale-95"
                    >
                      <Download size={22} />
                      Baixar PDF
                    </button>
                  </div>
                </div>

                {/* History */}
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-10">
                  <h2 className="text-2xl font-black text-[#111827] mb-8 flex items-center gap-3">
                    <History className="text-gray-300" size={28} />
                    Histórico de Infrações
                  </h2>
                  
                  <div className="space-y-5">
                    {history.length > 0 ? (
                      history.map(item => (
                        <div key={item.id} className="flex items-start gap-5 p-6 rounded-2xl bg-gray-50 border border-gray-100 hover:border-gray-200 transition-all">
                          <div className={cn(
                            "p-3 rounded-xl shadow-sm",
                            item.template_type === 'multa' ? "bg-red-100 text-red-600" : 
                            item.template_type === 'advertencia' ? "bg-amber-100 text-amber-600" : 
                            "bg-blue-100 text-blue-600"
                          )}>
                            <AlertTriangle size={24} />
                          </div>
                          <div className="flex-1">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                              <h3 className="font-black text-lg text-gray-800">{item.type}</h3>
                              <div className="flex flex-col items-end">
                                <span className="text-xs font-bold text-gray-400 flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full border border-gray-100">
                                  <Clock size={14} />
                                  Envio: {format(new Date(item.date), "dd/MM/yyyy HH:mm")}
                                </span>
                                {item.occurrence_date && (
                                  <span className="text-[10px] font-bold text-blue-500 mt-1">
                                    Ocorrência: {format(new Date(item.occurrence_date + 'T12:00:00'), "dd/MM/yyyy")}
                                  </span>
                                )}
                              </div>
                            </div>
                            <p className="text-sm font-medium text-gray-500 leading-relaxed">{item.description || "Sem descrição adicional."}</p>
                            <div className="mt-4 flex items-center gap-2">
                              <span className={cn(
                                "text-[10px] font-black uppercase px-3 py-1 rounded-lg tracking-widest",
                                item.template_type === 'multa' ? "bg-red-200 text-red-800" : 
                                item.template_type === 'advertencia' ? "bg-amber-200 text-amber-800" : 
                                "bg-blue-200 text-blue-800"
                              )}>
                                {item.template_type}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-16 text-gray-300 flex flex-col items-center gap-4 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-100">
                        <CheckCircle size={64} className="opacity-10" />
                        <p className="font-bold text-lg">Nenhuma infração registrada.</p>
                      </div>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-16 bg-white rounded-[40px] border-2 border-dashed border-gray-100">
                <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mb-8 shadow-inner">
                  <Building2 size={48} className="text-[#0056b3]" />
                </div>
                <h2 className="text-3xl font-black text-gray-800 mb-4">Pronto para começar?</h2>
                <p className="text-gray-500 max-w-md font-medium text-lg leading-relaxed">
                  Selecione uma unidade na lista ao lado para gerenciar as notificações ou importar sua planilha de proprietários.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[2.5rem] w-full max-w-lg overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
            <div className="p-8 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
              <div>
                <h2 className="text-2xl font-black text-gray-800">Configurações de Layout</h2>
                <p className="text-sm text-gray-500 font-medium">Personalize o papel timbrado e assinatura</p>
              </div>
              <button 
                onClick={() => setShowSettings(false)}
                className="p-3 hover:bg-white rounded-2xl text-gray-400 hover:text-gray-600 transition-all shadow-sm"
              >
                <X size={24} />
              </button>
            </div>
            <div className="p-8 space-y-8">
              <div className="space-y-4">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest block">Papel Timbrado (PNG)</label>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <input 
                      type="file" 
                      accept="image/png"
                      onChange={(e) => handleAssetUpload(e, 'letterhead')}
                      className="hidden" 
                      id="letterhead-upload"
                    />
                    <label 
                      htmlFor="letterhead-upload"
                      className="flex items-center justify-center gap-2 p-4 border-2 border-dashed border-gray-200 rounded-2xl cursor-pointer hover:border-[#0056b3] hover:bg-blue-50/30 transition-all group"
                    >
                      <Upload size={20} className="text-gray-400 group-hover:text-[#0056b3]" />
                      <span className="text-sm font-bold text-gray-600">Carregar Timbrado</span>
                    </label>
                  </div>
                  {letterhead && (
                    <div className="w-16 h-16 rounded-xl border border-gray-200 overflow-hidden bg-gray-50 flex items-center justify-center">
                      <img src={letterhead} className="max-w-full max-h-full object-contain" alt="Preview" />
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest block">Assinatura Manuscrita (PNG)</label>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <input 
                      type="file" 
                      accept="image/png"
                      onChange={(e) => handleAssetUpload(e, 'signature')}
                      className="hidden" 
                      id="signature-upload"
                    />
                    <label 
                      htmlFor="signature-upload"
                      className="flex items-center justify-center gap-2 p-4 border-2 border-dashed border-gray-200 rounded-2xl cursor-pointer hover:border-[#0056b3] hover:bg-blue-50/30 transition-all group"
                    >
                      <Upload size={20} className="text-gray-400 group-hover:text-[#0056b3]" />
                      <span className="text-sm font-bold text-gray-600">Carregar Assinatura</span>
                    </label>
                  </div>
                  {signature && (
                    <div className="w-16 h-16 rounded-xl border border-gray-200 overflow-hidden bg-gray-50 flex items-center justify-center">
                      <img src={signature} className="max-w-full max-h-full object-contain" alt="Preview" />
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="p-8 bg-gray-50/50 flex justify-end">
              <button 
                onClick={() => setShowSettings(false)}
                className="px-8 py-4 bg-[#0056b3] text-white rounded-2xl font-black shadow-lg shadow-blue-200 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                Concluído
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Import Modal */}
      {showImportModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[32px] w-full max-w-lg p-10 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-black text-gray-800">Importar Planilha</h3>
              <button onClick={() => setShowImportModal(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X size={24} />
              </button>
            </div>
            
            <div className="space-y-6">
              <p className="text-gray-500 font-medium">
                Selecione um arquivo CSV com as seguintes colunas:
                <br />
                <code className="text-xs bg-gray-100 p-1 rounded mt-2 block">
                  Unidade, Bloco, Nome/Razão Social, E-mail(s), Telefone/WhatsApp
                </code>
              </p>
              
              {!selectedFile ? (
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="border-4 border-dashed border-gray-100 rounded-3xl p-12 text-center hover:border-[#0056b3] hover:bg-blue-50 transition-all cursor-pointer group"
                >
                  <Upload size={48} className="mx-auto mb-4 text-gray-300 group-hover:text-[#0056b3] transition-colors" />
                  <p className="font-black text-gray-400 group-hover:text-[#0056b3]">Clique para selecionar o arquivo</p>
                  <input 
                    type="file" 
                    accept=".csv" 
                    className="hidden" 
                    ref={fileInputRef}
                    onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                  />
                </div>
              ) : (
                <div className="bg-blue-50 p-8 rounded-3xl border border-blue-100 text-center">
                  <FileSpreadsheet size={48} className="mx-auto mb-4 text-[#0056b3]" />
                  <p className="font-black text-blue-900 mb-2">{selectedFile.name}</p>
                  <button 
                    onClick={() => setSelectedFile(null)}
                    className="text-xs font-bold text-blue-400 hover:text-blue-600 underline"
                  >
                    Trocar arquivo
                  </button>
                </div>
              )}
              
              <div className="flex gap-4">
                <button 
                  onClick={() => {
                    setShowImportModal(false);
                    setSelectedFile(null);
                  }}
                  className="flex-1 py-4 font-black text-gray-400 hover:text-gray-600 transition-colors"
                >
                  Cancelar
                </button>
                {selectedFile && (
                  <button 
                    onClick={() => handleFileUpload(selectedFile)}
                    disabled={loading}
                    className="flex-1 py-4 bg-[#0056b3] text-white rounded-2xl font-black shadow-lg shadow-blue-200 hover:bg-[#004494] transition-all disabled:opacity-50"
                  >
                    {loading ? "Processando..." : "Importar Agora"}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Send Modal */}
      {showConfirmSend && selectedUnit && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[2.5rem] w-full max-w-lg overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
            <div className="p-8 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
              <div>
                <h2 className="text-2xl font-black text-gray-800">Confirmar Envio</h2>
                <p className="text-sm text-gray-500 font-medium">Revise os destinatários da notificação</p>
              </div>
              <button 
                onClick={() => setShowConfirmSend(false)}
                className="p-3 hover:bg-white rounded-2xl text-gray-400 hover:text-gray-600 transition-all shadow-sm"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="p-8 space-y-6">
              <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100">
                <p className="text-sm font-bold text-blue-900 mb-2">Destinatário Principal:</p>
                <div className="flex items-center gap-3 text-blue-700">
                  <Mail size={18} />
                  <span className="font-medium">{selectedUnit.emails || 'Nenhum e-mail cadastrado'}</span>
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest block">Cópia (CC):</label>
                
                <label className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl cursor-pointer hover:bg-gray-100 transition-all group">
                  <input 
                    type="checkbox" 
                    checked={ccSindico}
                    onChange={(e) => setCcSindico(e.target.checked)}
                    className="w-5 h-5 rounded-lg border-gray-300 text-[#0056b3] focus:ring-[#0056b3]"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-bold text-gray-700">E-mail do Síndico</p>
                    <p className="text-xs text-gray-400 font-medium">palacedefrance995@gmail.com</p>
                  </div>
                </label>

                {templateType.startsWith('multa') && (
                  <label className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl cursor-pointer hover:bg-gray-100 transition-all group">
                    <input 
                      type="checkbox" 
                      checked={ccAdmin}
                      onChange={(e) => setCcAdmin(e.target.checked)}
                      className="w-5 h-5 rounded-lg border-gray-300 text-[#0056b3] focus:ring-[#0056b3]"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-bold text-gray-700">Administração Predial</p>
                      <p className="text-xs text-gray-400 font-medium">doc01.ce@newpred.com</p>
                    </div>
                  </label>
                )}
              </div>

              <div className="flex gap-4 pt-4">
                <button 
                  onClick={() => setShowConfirmSend(false)}
                  className="flex-1 py-4 bg-gray-100 text-gray-600 rounded-2xl text-sm font-black hover:bg-gray-200 transition-all uppercase tracking-widest"
                >
                  Voltar
                </button>
                <button 
                  onClick={handleSend}
                  disabled={loading}
                  className="flex-1 py-4 bg-[#0056b3] text-white rounded-2xl text-sm font-black hover:bg-[#004494] transition-all shadow-lg shadow-blue-100 uppercase tracking-widest flex items-center justify-center gap-2"
                >
                  {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Send size={18} />}
                  Confirmar e Enviar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Unit Modal */}
      {showEditUnitModal && editingUnit && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[2.5rem] w-full max-w-lg overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
            <div className="p-8 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
              <div>
                <h2 className="text-2xl font-black text-gray-800">Editar Unidade {editingUnit.unit_number}-{editingUnit.block}</h2>
                <p className="text-sm text-gray-500 font-medium">Corrija nomes, e-mails ou telefones</p>
              </div>
              <button 
                onClick={() => setShowEditUnitModal(false)}
                className="p-3 hover:bg-white rounded-2xl text-gray-400 hover:text-gray-600 transition-all shadow-sm"
              >
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleUpdateUnit} className="p-8 space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Nome Completo / Razão Social</label>
                <input 
                  type="text" 
                  value={editingUnit.legal_name || ''}
                  onChange={(e) => setEditingUnit({...editingUnit, legal_name: e.target.value})}
                  placeholder="Ex: Fulano de Tal da Silva"
                  className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#0056b3] font-bold text-gray-700"
                  required
                />
                <p className="text-[10px] text-gray-400 italic font-medium">Este é o nome principal que aparecerá na notificação.</p>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Nome Curto (Opcional)</label>
                <input 
                  type="text" 
                  value={editingUnit.owner_name || ''}
                  onChange={(e) => setEditingUnit({...editingUnit, owner_name: e.target.value})}
                  placeholder="Ex: Sr. Silva"
                  className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#0056b3] font-bold text-gray-700"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest">E-mails</label>
                  <input 
                    type="text" 
                    value={editingUnit.emails || ''}
                    onChange={(e) => setEditingUnit({...editingUnit, emails: e.target.value})}
                    className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#0056b3] font-bold text-gray-700"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Telefones</label>
                  <input 
                    type="text" 
                    value={editingUnit.phones || ''}
                    onChange={(e) => setEditingUnit({...editingUnit, phones: e.target.value})}
                    className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#0056b3] font-bold text-gray-700"
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button 
                  type="button"
                  onClick={() => setShowEditUnitModal(false)}
                  className="flex-1 py-4 bg-gray-100 text-gray-600 rounded-2xl text-sm font-black hover:bg-gray-200 transition-all uppercase tracking-widest"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-4 bg-[#0056b3] text-white rounded-2xl text-sm font-black hover:bg-[#004494] transition-all shadow-lg shadow-blue-100 uppercase tracking-widest"
                >
                  Salvar Alterações
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <footer className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Mail size={14} />
            {process.env.SMTP_USER || 'E-mail não configurado'}
          </div>
          <div className="flex items-center gap-2">
            <Phone size={14} />
            Suporte Jurídico
          </div>
        </div>
        <div>
          &copy; 2026 Marcos Shalom - Assessoria Jurídica Condominial
        </div>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #E5E7EB;
          border-radius: 20px;
          border: 2px solid white;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #D1D5DB;
        }
      `}} />
    </div>
  );
}
