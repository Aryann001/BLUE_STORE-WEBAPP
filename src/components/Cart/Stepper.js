import {
    Box,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  useSteps,
} from "@chakra-ui/react";

const steps = [
  { title: "Shipping", description: "Shipping Info" },
  { title: "Confirm Order", description: "Summary" },
  { title: "Payment", description: "Payment Options" },
];

const ShippingStepper = ({ step }) => {
  const { activeStep } = useSteps({
    index: step,
    count: steps.length,
  });

  return (
    <Stepper width={"100%"} index={activeStep}>
      {steps.map((step, index) => (
        <Step key={index}>
          <StepIndicator>
            <StepStatus
              complete={<StepIcon />}
              incomplete={<StepNumber />}
              active={<StepNumber />}
            />
          </StepIndicator>

          <Box flexShrink="0">
            <StepTitle>{step.title}</StepTitle>
            <StepDescription>{step.description}</StepDescription>
          </Box>

          <StepSeparator />
        </Step>
      ))}
    </Stepper>
  );
};

export default ShippingStepper;
