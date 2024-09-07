'use client';

import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import StepIndicator from './step-indicator';
import TermsAgreement from './terms-agreement';
import SignUpForm from './sign-up-form';
import CompletionStep from './completion-step';
import useAuthStore from '@/stores/use-auth-store';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
} from '@/components/ui/alert-dialog';
import Link from 'next/link';

const steps = ['약관동의', '정보입력', '가입완료'];

const SignUpProcess = () => {
  const [step, setStep] = useState(0);
  const [isFormValid, setIsFormValid] = useState(false);
  const { signupData, submitSignup } = useAuthStore();
  const [isAgreedPrivacy, setIsAgreedPrivacy] = useState(false);
  const [isAgreedTerms, setIsAgreedTerms] = useState(false);
  const [showAlertDialog, setShowAlertDialog] = useState(false);

  const handleStepClick = (index: number) => {
    if (index === 0) {
      setStep(index);
    } else if (index === 1 && isAgreedPrivacy && isAgreedTerms) {
      setStep(index);
    } else if (index === 2 && isFormValid) {
      setStep(index);
    } else {
      alert(index === 1 ? '약관에 동의해 주세요.' : '모든 필드를 올바르게 입력해 주세요.');
    }
  };

  const handleCheckboxChange =
    (setter: React.Dispatch<React.SetStateAction<boolean>>) => (checked: boolean) =>
      setter(checked);

  const handleFormValidityChange = useCallback((isValid: boolean) => {
    setIsFormValid(isValid);
  }, []);

  const handlePrevStep = () => step > 0 && setStep(step - 1);

  const handleNextStep = async (e: React.FormEvent) => {
    e.preventDefault();

    if (step === 0 && isAgreedPrivacy && isAgreedTerms) {
      setStep(step + 1);
    } else if (step === 1 && isFormValid) {
      try {
        await submitSignup();
        setStep(step + 1);
      } catch (error) {
        console.error('Error during signup:', error);
        setShowAlertDialog(true);
      }
    } else {
      alert(step === 0 ? '약관에 동의해 주세요.' : '모든 필드를 올바르게 입력해 주세요.');
    }
  };

  return (
    <div className="mx-auto mt-8 max-w-xl">
      <StepIndicator steps={steps} currentStep={step} onStepClick={handleStepClick} />
      {step === 0 && (
        <TermsAgreement
          isAgreedPrivacy={isAgreedPrivacy}
          isAgreedTerms={isAgreedTerms}
          onPrivacyChange={handleCheckboxChange(setIsAgreedPrivacy)}
          onTermsChange={handleCheckboxChange(setIsAgreedTerms)}
        />
      )}
      {step === 1 && (
        <SignUpForm onSubmit={submitSignup} onValidChange={handleFormValidityChange} />
      )}
      {step === 2 && <CompletionStep userName={signupData.name} />}
      <div className="mt-8 flex justify-between gap-x-4">
        {step < 2 ? (
          <>
            <Button
              variant="outline"
              onClick={handlePrevStep}
              disabled={step === 0}
              size="lg"
              className="flex-1 text-base"
            >
              이전
            </Button>
            <Button
              onClick={handleNextStep}
              disabled={
                (step === 0 && (!isAgreedPrivacy || !isAgreedTerms)) || (step === 1 && !isFormValid)
              }
              size="lg"
              className="flex-1 text-base"
            >
              다음
            </Button>
          </>
        ) : (
          <Button size="lg" className="w-full text-base" asChild>
            <Link href="/">홈으로 이동</Link>
          </Button>
        )}
      </div>

      {/* AlertDialog for error handling */}
      <AlertDialog open={showAlertDialog} onOpenChange={setShowAlertDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>회원가입 실패</AlertDialogTitle>
            <AlertDialogDescription>
              회원가입 중 오류가 발생했습니다. 다시 시도해 주세요.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setShowAlertDialog(false)}>확인</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default SignUpProcess;
