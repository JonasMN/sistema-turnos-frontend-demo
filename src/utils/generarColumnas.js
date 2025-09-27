import Button from "../components/Button/Button.jsx";
import { Edit, Trash2 } from "lucide-react";
import moment from "moment";

export default function generateColumns(fields,{ onEdit, onDelete, disableEdit, customActions = [] } = {}) {
  const baseColumns = fields.map((f) => {
    let customCell = f.customCell ?? null;

    if (f.type === "date") {
      customCell = (row) =>
        row[f.column] ? moment(row[f.column]).format(f.format || "DD/MM/YYYY") : "-";
    }

    return {
      headerName: f.header,
      column: f.column,
      center: f.center ?? false,
      customCell,
    };
  });

  const actionsColumn = {
    headerName: "",
    column: "",
    center: true,
    flex: 0.5,
    customCell: (row) => (
      <div className="d-flex gap-2 justify-content-center">
        {onEdit && (
          <Button
            onClick={() => onEdit(row)}
            variant="primary"
            size="small"
            icon={Edit}
            iconPosition="left"
            disabled={typeof disableEdit === "function" ? disableEdit(row) : disableEdit}
          />
        )}
        {onDelete && (
          <Button
            onClick={() => onDelete(row)}
            variant="secondary"
            size="small"
            icon={Trash2}
            iconPosition="left"
          />
        )}
        {customActions.map((action, idx) => (
          <Button
            key={idx}
            onClick={() => action.onClick(row)}
            variant={action.variant || "secondary"}
            size={action.size || "small"}
            icon={action.icon}
            iconPosition={action.iconPosition || "left"}
            title={action.label || ""}
            disabled={typeof action.disabled === "function" ? action.disabled(row) : action.disabled}
            >
            {action.text || ""}
          </Button>
        ))}
      </div>
    ),
  };

  return [...baseColumns, actionsColumn];
}
