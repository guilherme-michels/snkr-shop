import React, { memo, useCallback, useEffect, useRef, useState } from "react";

export interface DropZoneProps {
  onDragStateChange?: (isDragActive: boolean) => void;
  onDrag?: () => void;
  onDragIn?: () => void;
  onDragOut?: () => void;
  onDrop?: () => void;
  onFileDrop?: (file: File) => void;
}

export const UploadFile = memo(
  (props: React.PropsWithChildren<DropZoneProps>) => {
    const {
      onDragStateChange,
      onFileDrop,
      onDrag,
      onDragIn,
      onDragOut,
      onDrop,
    } = props;

    const [isDragActive, setIsDragActive] = useState(false);
    const dropZoneRef = useRef<null | HTMLDivElement>(null);

    const handleDragIn = useCallback(
      (event: any) => {
        event.preventDefault();
        event.stopPropagation();
        onDragIn?.();

        if (event.dataTransfer.items && event.dataTransfer.items.length > 0) {
          setIsDragActive(true);
        }
      },
      [onDragIn]
    );

    const handleDragOut = useCallback(
      (event: any) => {
        event.preventDefault();
        event.stopPropagation();
        onDragOut?.();

        setIsDragActive(false);
      },
      [onDragOut]
    );

    const handleDrag = useCallback(
      (event: any) => {
        event.preventDefault();
        event.stopPropagation();

        onDrag?.();
        if (!isDragActive) {
          setIsDragActive(true);
        }
      },
      [isDragActive, onDrag]
    );

    const handleDrop = useCallback(
      (event: any) => {
        event.preventDefault();
        event.stopPropagation();

        setIsDragActive(false);
        onDrop?.();

        if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
          const files = event.dataTransfer.files[0];

          onFileDrop?.(files);
          event.dataTransfer.clearData();
        }
      },
      [onDrop, onFileDrop]
    );

    useEffect(() => {
      onDragStateChange?.(isDragActive);
    }, [isDragActive, onDragStateChange]);

    useEffect(() => {
      const tempZoneRef = dropZoneRef?.current;
      if (tempZoneRef) {
        tempZoneRef.addEventListener("dragenter", handleDragIn);
        tempZoneRef.addEventListener("dragleave", handleDragOut);
        tempZoneRef.addEventListener("dragover", handleDrag);
        tempZoneRef.addEventListener("drop", handleDrop);
      }

      return () => {
        tempZoneRef?.removeEventListener("dragenter", handleDragIn);
        tempZoneRef?.removeEventListener("dragleave", handleDragOut);
        tempZoneRef?.removeEventListener("dragover", handleDrag);
        tempZoneRef?.removeEventListener("drop", handleDrop);
      };
    }, [handleDrag, handleDragIn, handleDragOut, handleDrop]);

    return <div ref={dropZoneRef}>{props.children}</div>;
  }
);

UploadFile.displayName = "DropZone";
