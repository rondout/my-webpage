import AceEditor from "react-ace";
import { useTranslation } from "react-i18next";
import ace from "ace-builds";
/*eslint-disable-next-line */
ace.config.setModuleUrl("ace/mode/json", require("file-loader?esModule=false!ace-builds/src-noconflict/mode-json.js"));
/*eslint-disable-next-line */
ace.config.setModuleUrl("ace/theme/github", require("file-loader?esModule=false!ace-builds/src-noconflict/theme-github.js"));
/*eslint-disable-next-line */
ace.config.setModuleUrl("ace/mode/json_worker", require("file-loader?esModule=false!ace-builds/src-noconflict/worker-json.js"));

interface CustomAceEditorProps {
  placeholderTip: string;
  value: string;
  onChange(value: string): void;
  mode: "json" | "javascript";
  height?: string;
  width?: string;
  readOnly?: boolean;
}

export default function CustomAceEditor(props: CustomAceEditorProps) {
  const { placeholderTip, value, onChange, mode, width = "100%", height = "320px", readOnly } = props;
  const { t } = useTranslation();

  const onValueChange = (newValue: string) => {
    onChange(newValue);
  };
  return (
    <AceEditor
      showPrintMargin={false}
      placeholder={t(placeholderTip)}
      mode={mode}
      readOnly={readOnly}
      theme="github"
      //onChange={onChange}
      name="UNIQUE_ID_OF_DIV"
      editorProps={{ $blockScrolling: true }}
      width={width}
      height={height}
      fontSize={16}
      value={value}
      onChange={onValueChange}
    />
  );
}
