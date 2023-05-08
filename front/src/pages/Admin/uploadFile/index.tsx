import React, { memo, useCallback, useRef, useState } from "react";
import classNames from "classnames";

import { UploadFile } from "./UploadFile";
import { FileList } from "./FileList";

export const IndexUploadFile = memo<{ onChangeFiles: (file: File) => void }>(
  ({ onChangeFiles }) => {
    const [isDropActive, setIsDropActive] = useState(false);
    const [file, setFile] = useState<File>();

    const onDragStateChange = useCallback((dragActive: boolean) => {
      setIsDropActive(dragActive);
    }, []);

    const onFileDrop = useCallback(
      (file: File) => {
        setFile(file);
        onChangeFiles(file);
      },
      [onChangeFiles]
    );

    const inputRef = useRef<any>();

    const handleClick = () => {
      inputRef.current.click();
    };

    const handleFileChange = (event: any) => {
      const fileObj = event.target.files && event.target.files[0];
      if (!fileObj) {
        return;
      } else {
        setFile(fileObj);
        onChangeFiles(fileObj);
      }
    };

    function onDeleteFile() {
      setFile(undefined);
    }

    return (
      <div
        className={classNames("dropZoneWrapper", {
          dropZoneActive: isDropActive,
        })}
      >
        <UploadFile
          onDragStateChange={onDragStateChange}
          onFileDrop={onFileDrop}
        >
          <div
            onClick={handleClick}
            style={{
              border: "1px",
              marginTop: "5px",
              borderStyle: "dashed",
              padding: "11px",
              cursor: "pointer",
              borderRadius: "6px",
              color: "gray",
            }}
          >
            <span>Place the document here</span>

            <input
              style={{
                display: "none",
                width: "100%",
              }}
              ref={inputRef}
              type="file"
              onChange={handleFileChange}
            />
          </div>
        </UploadFile>
        {file ? (
          <div style={{ marginTop: "10px", padding: "18px", width: "100%" }}>
            <FileList file={file} onDeleteFile={onDeleteFile} />
          </div>
        ) : null}
      </div>
    );
  }
);

IndexUploadFile.displayName = "App";
