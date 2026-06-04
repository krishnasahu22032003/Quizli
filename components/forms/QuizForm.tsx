import { useForm } from "react-hook-form";
import { quizCreationSchema } from "@/schemas/Quiz.schema";
import {z} from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { InputType } from "zlib";

type Input = z.infer<typeof quizCreationSchema>;
type Props = {
  topic: string;
};

const QuizCreation = ({ topic: topicParam }: Props) => {

    const [showLoader , setShowLoader ] = useState(false) ;


    const form = useForm<Input>({
    resolver: zodResolver(quizCreationSchema),
    defaultValues: {
      topic: topicParam,
      type: "mcq",
      amount: 3,
    },
  });
   
  async function onSubmit(data:Input){

setShowLoader(true) ;



  }


  form.watch() ;

  return (
    <div>QuizCreation</div>
  )
}

export default QuizCreation