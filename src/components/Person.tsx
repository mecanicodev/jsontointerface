import { FC } from "react";

interface Props {
  name: string,
  age: number,
  email: string,
}

export const Person: FC<Props> = ({name, age, email}) => {
  return (
    <div>
      <p>{name}</p>
      <p>{age}</p>
      <p>{email}</p>
    </div>
  );
}
