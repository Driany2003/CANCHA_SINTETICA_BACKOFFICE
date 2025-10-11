import React from 'react';
import {
  Calendar,
  Plus,
  BarChart3,
  Menu,
  User,
  X,
  CheckCircle,
  XCircle,
  Clock,
  Edit3,
  Trash2,
  Save,
  Phone,
  Mail,
  CreditCard,
  Filter,
  DollarSign,
  Users,
  Download,
  Search,
  Eye,
  MapPin,
  Building,
  LogOut,
  EyeOff,
  Lock
} from 'lucide-react';
import { GiSoccerField } from "react-icons/gi";
import { HiUserGroup } from "react-icons/hi";
import { FaUserTie, FaCalendarCheck, FaChartLine, FaBuilding } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";

interface IconProps {
  className?: string;
}

// ===== ICONOS DEL SIDEBAR =====

// Dashboard
export const DashboardIcon = ({ className = "h-5 w-5" }: IconProps) => {
  return React.createElement(MdDashboard as any, { className });
};

// Reservas
export const ReservasIcon = ({ className = "h-5 w-5" }: IconProps) => {
  return React.createElement(FaCalendarCheck as any, { className });
};

// Canchas
export const FutbolIcon = ({ className = "h-5 w-5" }: IconProps) => {
  return React.createElement(GiSoccerField as any, { className });
};

// Clientes
export const ClientesIcon = ({ className = "h-5 w-5" }: IconProps) => {
  return React.createElement(HiUserGroup as any, { className });
};

// Usuarios
export const UsuariosIcon = ({ className = "h-5 w-5" }: IconProps) => {
  return React.createElement(FaUserTie as any, { className });
};

// Empresa
export const EmpresaIcon = ({ className = "h-5 w-5" }: IconProps) => {
  return React.createElement(FaBuilding as any, { className });
};

// Reportes
export const ReportesIcon = ({ className = "h-5 w-5" }: IconProps) => {
  return React.createElement(FaChartLine as any, { className });
};

// ===== ICONOS COMUNES =====

export const PlusIcon: React.FC<IconProps> = ({ className = "h-5 w-5" }) => (
  <Plus className={className} />
);

export const CalendarIcon: React.FC<IconProps> = ({ className = "h-5 w-5" }) => (
  <Calendar className={className} />
);

export const ChartIcon: React.FC<IconProps> = ({ className = "h-5 w-5" }) => (
  <BarChart3 className={className} />
);

export const BarsIcon: React.FC<IconProps> = ({ className = "h-5 w-5" }) => (
  <Menu className={className} />
);

export const UserIcon: React.FC<IconProps> = ({ className = "h-5 w-5" }) => (
  <User className={className} />
);

export const CloseIcon: React.FC<IconProps> = ({ className = "h-5 w-5" }) => (
  <X className={className} />
);

export const XIcon: React.FC<IconProps> = ({ className = "h-5 w-5" }) => (
  <X className={className} />
);

export const LogoutIcon: React.FC<IconProps> = ({ className = "h-5 w-5" }) => (
  <LogOut className={className} />
);

// ===== ICONOS DE ACCIONES =====

export const SearchIcon: React.FC<IconProps> = ({ className = "h-5 w-5" }) => (
  <Search className={className} />
);

export const EditIcon: React.FC<IconProps> = ({ className = "h-5 w-5" }) => (
  <Edit3 className={className} />
);

export const TrashIcon: React.FC<IconProps> = ({ className = "h-5 w-5" }) => (
  <Trash2 className={className} />
);

export const EyeIcon: React.FC<IconProps> = ({ className = "h-5 w-5" }) => (
  <Eye className={className} />
);

export const FilterIcon: React.FC<IconProps> = ({ className = "h-5 w-5" }) => (
  <Filter className={className} />
);

export const SaveIcon: React.FC<IconProps> = ({ className = "h-5 w-5" }) => (
  <Save className={className} />
);

export const DownloadIcon: React.FC<IconProps> = ({ className = "h-5 w-5" }) => (
  <Download className={className} />
);

// ===== ICONOS DE ESTADO =====

export const CheckCircleIcon: React.FC<IconProps> = ({ className = "h-5 w-5" }) => (
  <CheckCircle className={className} />
);

export const TimesCircleIcon: React.FC<IconProps> = ({ className = "h-5 w-5" }) => (
  <XCircle className={className} />
);

export const ClockIcon: React.FC<IconProps> = ({ className = "h-5 w-5" }) => (
  <Clock className={className} />
);

// ===== ICONOS DE INFORMACIÓN =====

export const PhoneIcon: React.FC<IconProps> = ({ className = "h-5 w-5" }) => (
  <Phone className={className} />
);

export const EnvelopeIcon: React.FC<IconProps> = ({ className = "h-5 w-5" }) => (
  <Mail className={className} />
);

export const MailIcon: React.FC<IconProps> = ({ className = "h-5 w-5" }) => (
  <Mail className={className} />
);

export const MapPinIcon: React.FC<IconProps> = ({ className = "h-5 w-5" }) => (
  <MapPin className={className} />
);

export const BuildingOfficeIcon: React.FC<IconProps> = ({ className = "h-5 w-5" }) => (
  <Building className={className} />
);

// ===== ICONOS FINANCIEROS =====

export const CreditCardIcon: React.FC<IconProps> = ({ className = "h-5 w-5" }) => (
  <CreditCard className={className} />
);

export const DollarSignIcon: React.FC<IconProps> = ({ className = "h-5 w-5" }) => (
  <DollarSign className={className} />
);

export const CurrencyDollarIcon: React.FC<IconProps> = ({ className = "h-5 w-5" }) => (
  <DollarSign className={className} />
);

export const UsersIcon: React.FC<IconProps> = ({ className = "h-5 w-5" }) => (
  <Users className={className} />
);

// ===== ICONOS DE AUTENTICACIÓN =====

export const EyeSlashIcon: React.FC<IconProps> = ({ className = "h-5 w-5" }) => (
  <EyeOff className={className} />
);

export const LockClosedIcon: React.FC<IconProps> = ({ className = "h-5 w-5" }) => (
  <Lock className={className} />
);
