import React from "react";
import CustomInput from "@/components/input";
import CustomSelect from "@/components/select";
import { StepFiveProps } from "./types";
import { notificationEvents, notificationOptions } from "@/utils/stepFiveObjects";

const StepFive: React.FC<StepFiveProps> = ({
    setFieldValue,
    setFieldError,
    values,
  }) => {
  return (
    <div className="flex flex-col gap-4">
      <h2>Notificações</h2>

      {Object.entries(notificationEvents).map(([eventKey, eventLabel]) => (
        <div key={eventKey} className="flex flex-col gap-3">
          <h3>{eventLabel}</h3>
          <div className="flex gap-2">
            {Object.keys(notificationOptions).map((key) => (
              <CustomInput
                key={key}
                name={`${eventKey}.${key}`}
                type="checkbox"
                value={key}
                label={
                  notificationOptions[key as keyof typeof notificationOptions]
                }
              />
            ))}
          </div>

          {(eventKey === "PAYMENT_OVERDUE_REPEAT" ||
            eventKey === "PAYMENT_DUEDATE_WARNING_OFFSET") && (
            <CustomSelect
              name={`${eventKey}.scheduleOffset`}
              label="Dias antes/apos do evento:"
              ariaLabel="Dias antes/apos do evento"
              options={{
                "0": "0 dias",
                "1": "1 dia",
                "5": "5 dias",
                "7": "7 dias",
                "10": "10 dias",
                "15": "15 dias",
                "30": "30 dias",
              }}
              required
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default StepFive;
