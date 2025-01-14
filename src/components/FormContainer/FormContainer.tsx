import { FC, ReactNode } from "react";
import { Card } from "../ui/card";

interface FormContainerProps {
  children: ReactNode;
  title: string;
}

export const FormContainer: FC<FormContainerProps> = ({ children, title }) => {
  return (
    <div className="flex flex-col">
      <h1 className="font-luckiest text-lg text-[#471a08]">{title}</h1>
      <Card className="p-16 w-[600px] border-4 border-[#471a08]">
        {children}
      </Card>
    </div>
  );
};

export const withFormContainer = <P extends object>(
  WrappedComponent: FC<P>,
  title: string
): FC<P> => {
  const ComponentWithFormContainer: FC<P> = (props: P) => (
    <FormContainer title={title}>
      <WrappedComponent {...props} />
    </FormContainer>
  );

  ComponentWithFormContainer.displayName = `withFormContainer(${
    WrappedComponent.displayName || WrappedComponent.name
  })`;

  return ComponentWithFormContainer;
};
