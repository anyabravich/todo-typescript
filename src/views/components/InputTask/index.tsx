import React, { useEffect, useRef, useState } from "react";
import styles from "./index.module.scss";

interface InputTaskProps {
  id: string;
  title: string;
  onDone: (is: string) => void;
  onEdited: (id: string, title: string) => void;
  onRemoved: (id: string) => void;
}

export const InputTask: React.FC<InputTaskProps> = ({
  id,
  title,
  onDone,
  onEdited,
  onRemoved,
}) => {
  const [checked, setChecked] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [value, setValue] = useState(title);
  const editTitleInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditMode) {
      editTitleInputRef?.current?.focus();
    }
  }, [isEditMode]);

  return (
    <div className={styles.inputTask}>
      <label className={styles.inputTaskLabel}>
        <input
          className={styles.inputTaskCheckbox}
          type="checkbox"
          disabled={isEditMode}
          checked={checked}
          onChange={(e) => {
            setChecked(e.target.checked);
            if (e.target.checked) {
              setTimeout(() => {
                onDone(id);
              }, 300);
            }
          }}
        />
        {isEditMode ? (
          <input
            className={styles.inputTaskEditTitle}
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onEdited(id, value);
                setIsEditMode(false);
              }
            }}
            ref={editTitleInputRef}
          />
        ) : (
          <span className={styles.inputTaskTitle}>{title}</span>
        )}
      </label>
      {isEditMode ? (
        <button
          className={styles.inputTaskSave}
          aria-label="Save"
          onClick={() => {
            onEdited(id, value);
            setIsEditMode(false);
          }}
        />
      ) : (
        <button
          className={styles.inputTaskEdit}
          aria-label="Edit"
          onClick={() => {
            setIsEditMode(true);
          }}
        />
      )}
      <button
        className={styles.inputTaskRemove}
        aria-label="Remove"
        onClick={() => {
          onRemoved(id);
        }}
      />
    </div>
  );
};
