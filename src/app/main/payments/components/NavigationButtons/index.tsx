import React from "react";
import Button from "@/components/button";

interface NavigationButtonsProps {
  currentStep: number;
  handleNextStep: (isValid: boolean) => void;
  handlePrevStep: () => void;
  isValid: boolean;
}

export const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  currentStep,
  handleNextStep,
  handlePrevStep,
  isValid,
}) => {
  return (
    <div className="flex gap-5 justify-between mt-5">
      {currentStep > 1 && (
        <Button
          type="button"
          text="Voltar"
          color="bg-gray-500"
          hoverColor="hover:bg-gray-700"
          onClick={handlePrevStep}
        />
      )}
      {currentStep < 6 ? (
        <Button
          type="button"
          text="Próximo"
          color={isValid ? "bg-[#A644CB]" : "bg-red-500"}
          hoverColor={isValid ? "hover:bg-[#8E38A6]" : "hover:bg-red-700"}
          onClick={() => handleNextStep(isValid)}
          disabled={!isValid}
        />
      ) : (
        <Button
          type="submit"
          text="Finalizar"
          color={isValid ? "bg-[#A644CB]" : "bg-red-500"}
          hoverColor={isValid ? "hover:bg-[#8E38A6]" : "hover:bg-red-700"}
          disabled={!isValid}
        />
      )}
    </div>
  );
};
