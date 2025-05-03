// import React, { useState } from "react";

// const QuizComponent = ({ quiz, userId, onQuestionUpdate }) => {
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [score, setScore] = useState(0);
//   const [answers, setAnswers] = useState([]);
//   const [showResults, setShowResults] = useState(false);

//   // Gọi callback để cập nhật số câu hiện tại và tổng số câu
//   React.useEffect(() => {
//     if (onQuestionUpdate) {
//       onQuestionUpdate(currentQuestion + 1, quiz.questions.length);
//     }
//   }, [currentQuestion, quiz.questions.length, onQuestionUpdate]);

//   const handleAnswer = (selected) => {
//     if (!quiz?.questions) return;

//     const isCorrect =
//       selected === quiz.questions[currentQuestion]?.correctAnswer;
//     const newScore = isCorrect ? score + 1 : score;
//     setScore(newScore);

//     const newAnswers = [
//       ...answers,
//       {
//         questionIndex: currentQuestion,
//         userAnswer: selected,
//         correct: isCorrect,
//         question: quiz.questions[currentQuestion].question,
//         correctAnswer: quiz.questions[currentQuestion].correctAnswer,
//         explanation: quiz.questions[currentQuestion].explanation,
//       },
//     ];
//     setAnswers(newAnswers);

//     if (currentQuestion < (quiz.questions?.length || 0) - 1) {
//       setCurrentQuestion(currentQuestion + 1);
//     } else {
//       setShowResults(true);
//     }
//   };

//   const handleRestart = () => {
//     setCurrentQuestion(0);
//     setScore(0);
//     setAnswers([]);
//     setShowResults(false);
//     if (onQuestionUpdate) {
//       onQuestionUpdate(1, quiz.questions.length); // reset về câu 1
//     }
//   };

//   if (!quiz)
//     return <div className="text-gray-500 text-center py-4">Loading...</div>;

//   if (!quiz.questions || quiz.questions.length === 0) {
//     return (
//       <div className="text-red-500 text-center py-4">
//         No questions available.
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       {showResults ? (
//         <div className="">
//           <h2 className="text-2xl font-bold text-gray-900 mb-4">
//             Kết quả của bạn
//           </h2>
//           <p className="text-lg text-gray-800 mb-2">Điểm: {score * 10} 😊</p>
//           <p className="text-gray-600 mb-4">
//             Bạn đã trả lời đúng {score} / {quiz.questions.length} câu.
//           </p>

//           <div className="space-y-3">
//             {answers.map((answer, index) => (
//               <div
//                 key={index}
//                 className={`p-4 rounded-lg ${
//                   answer.correct ? "bg-green-100" : "bg-red-100"
//                 }`}
//               >
//                 <p className="text-gray-800">
//                   Câu {index + 1}: {answer.question}
//                 </p>
//                 <p className="text-gray-600">
//                   Đáp án của bạn: {answer.userAnswer}
//                 </p>
//                 <p className="text-gray-600">
//                   Đáp án đúng: {answer.correctAnswer}
//                 </p>
//                 {!answer.correct && answer.explanation && (
//                   <p className="text-gray-700 mt-1">
//                     Giải thích: {answer.explanation}
//                   </p>
//                 )}
//               </div>
//             ))}
//           </div>

//           <div className="flex justify-center">
//             <button
//               className="mt-6 bg-primary text-white px-4 py-3 rounded-2xl hover:bg-primary-hover transition duration-300"
//               onClick={handleRestart}
//             >
//               Làm lại bài quiz
//             </button>
//           </div>
//         </div>
//       ) : (
//         <div className="">
//           <div className="flex flex-col items-center gap-4 mb-4">
//             <img
//               src={quiz.questions[currentQuestion].image}
//               alt={quiz.questions[currentQuestion].question}
//               className="w-[190px] object-contain rounded-full"
//             />
//             <p className="text-xl font-semibold">
//               {quiz.questions[currentQuestion].question}
//             </p>
//           </div>
//           <div className="grid grid-cols-1 gap-3">
//             {quiz.questions[currentQuestion].options.map((option, index) => (
//               <button
//                 key={index}
//                 onClick={() => handleAnswer(option)}
//                 className="w-full bg-white border-2 border-primary text-black text-lg font-semibold py-3 rounded-full active:bg-primary active:text-white transition duration-300 text-center"
//               >
//                 {String.fromCharCode(65 + index)}. {option}
//               </button>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default QuizComponent;
