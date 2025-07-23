import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import BackButton from '@/components/BackButton';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { useExamsStorage, useCertificatesStorage, useCoursesStorage } from '@/hooks/useLocalStorage';
import QuizTimer from '@/components/QuizTimer';

const ExamPage = () => {
  const { courseId } = useParams();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();
  
  const [exams, setExams] = useExamsStorage();
  const [courses] = useCoursesStorage();
  const [certificates, setCertificates] = useCertificatesStorage();
  
  const [exam, setExam] = useState(null);
  const [course, setCourse] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [answers, setAnswers] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [passed, setPassed] = useState(false);

  useEffect(() => {
    if (exams.length === 0) {
      const demoExams = [
        { id: 1, courseId: 1, title: 'JavaScript Fundamentals Final Exam', questions: [ { id: 1, question: 'Which keyword is used to define a constant variable?', options: ['let', 'var', 'const', 'static'], correct: 2 }, { id: 2, question: 'What is "NaN"?', options: ['Not a Number', 'No action Needed', 'Null and None', 'A valid number'], correct: 0 }, { id: 3, question: 'How do you create a function in JavaScript?', options: ['function = myFunction()', 'function myFunction()', 'create function myFunction()', 'def myFunction()'], correct: 1 } ] },
        { id: 2, courseId: 2, title: 'React Development Final Exam', questions: [ { id: 1, question: 'What is JSX?', options: ['JavaScript XML', 'JavaScript Extension', 'Java Syntax Extension', 'JSON Syntax'], correct: 0 }, { id: 2, question: 'Which hook is used for state management in functional components?', options: ['useEffect', 'useState', 'useContext', 'useReducer'], correct: 1 } ] },
      ];
      setExams(demoExams);
    }
  }, [exams, setExams]);

  useEffect(() => {
    const currentExam = exams.find(e => e.courseId === parseInt(courseId));
    const currentCourse = courses.find(c => c.id === parseInt(courseId));
    setExam(currentExam);
    setCourse(currentCourse);
  }, [courseId, exams, courses]);

  const handleFinishExam = () => {
    let correctAnswers = 0;
    const finalAnswers = selectedAnswer !== '' ? [...answers, selectedAnswer] : answers;
    
    finalAnswers.forEach((answer, index) => {
      if (answer === exam.questions[index].correct) {
        correctAnswers++;
      }
    });

    const finalScore = Math.round((correctAnswers / exam.questions.length) * 100);
    setScore(finalScore);
    const hasPassed = finalScore >= 75;
    setPassed(hasPassed);
    setIsCompleted(true);
    
    const pointsEarned = Math.round(finalScore / 10);
    updateUser({ points: (user.points || 0) + pointsEarned });

    if (hasPassed) {
      const newCertificate = {
        id: Date.now(),
        userId: user.id,
        courseId: course.id,
        courseName: course.title,
        userName: user.name,
        profilePicUrl: user.profilePicture,
        issuedDate: new Date().toISOString()
      };
      setCertificates([...certificates, newCertificate]);
      toast({ title: t('congratulations'), description: `${t('examScore')}: ${finalScore}%. You earned ${pointsEarned} points!` });
    } else {
      toast({ title: t('failedExam'), description: `${t('examScore')}: ${finalScore}%.`, variant: 'destructive' });
    }
  };

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === '') {
      toast({ title: t('error'), description: 'Please select an answer', variant: 'destructive' });
      return;
    }
    setAnswers([...answers, selectedAnswer]);
    setSelectedAnswer('');
    if (currentQuestion < exam.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleFinishExam();
    }
  };

  if (!exam || !course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <i className="fas fa-spinner fa-spin text-5xl text-white"></i>
          <p className="text-gray-300 mt-4">{t('loading')}</p>
        </div>
      </div>
    );
  }

  if (isCompleted) {
    return (
      <>
        <Helmet><title>Exam Results - Learning Platform</title></Helmet>
        <div className="min-h-screen flex items-center justify-center px-6 py-12"> <LanguageSwitcher />
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="container mx-auto max-w-2xl text-center">
            <BackButton to={`/courses/${course.slug}`} />
            <Card className="glass-effect border-white/20">
              <CardContent className="p-12">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3, type: "spring" }}>
                  <i className={`fas ${passed ? 'fa-award text-yellow-400' : 'fa-times-circle text-red-500'} text-7xl mx-auto mb-6`}></i>
                </motion.div>
                <h1 className="text-4xl font-bold gradient-text mb-4">{passed ? t('congratulations') : t('failedExam')}</h1>
                <div className="text-6xl font-bold text-white mb-4">{score}%</div>
                <p className="text-xl text-gray-300 mb-8">{passed ? t('youPassedTheExam') : t('youFailedTheExam')}</p>
                <div className="space-y-4">
                  {passed ? (
                    <Link to="/dashboard/certificates"><Button className="w-full btn-primary"><i className="fas fa-certificate mr-2"></i>{t('viewCertificate')}</Button></Link>
                  ) : (
                    <Button className="w-full btn-primary" onClick={() => window.location.reload()}><i className="fas fa-redo mr-2"></i>{t('retakeExam')}</Button>
                  )}
                  <Link to="/courses"><Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10"><i className="fas fa-chalkboard-teacher mr-2"></i>Back to Courses</Button></Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </>
    );
  }

  const currentQ = exam.questions[currentQuestion];
  return (
    <>
      <Helmet><title>{exam.title} - Learning Platform</title></Helmet>
      <div className="min-h-screen px-6 py-12"><LanguageSwitcher />
        <div className="container mx-auto max-w-4xl"><BackButton to={`/courses/${course.slug}`} />
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex justify-between items-center mb-8">
              <div><h1 className="text-3xl font-bold gradient-text mb-2">{exam.title}</h1><p className="text-gray-300">{t('question')} {currentQuestion + 1} of {exam.questions.length}</p></div>
              <QuizTimer initialTime={600} onTimeUp={handleFinishExam} />
            </div>
            <div className="mb-8"><div className="w-full bg-white/10 rounded-full h-2"><div className="progress-bar h-2" style={{ width: `${((currentQuestion + 1) / exam.questions.length) * 100}%` }}></div></div></div>
            <AnimatePresence mode="wait">
              <motion.div key={currentQuestion} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.3 }}>
                <Card className="quiz-question-card"><CardContent>
                  <h2 className="text-2xl font-semibold text-white mb-8">{currentQ.question}</h2>
                  <div className="space-y-4">{currentQ.options.map((option, index) => (
                    <motion.div key={index} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <div onClick={() => handleAnswerSelect(index)} className={`answer-option ${selectedAnswer === index ? 'selected' : ''}`}>
                        <div className="flex items-center space-x-3">
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedAnswer === index ? 'border-blue-400 bg-blue-400' : 'border-gray-400'}`}>{selectedAnswer === index && (<i className="fas fa-check text-white text-xs"></i>)}</div>
                          <span className="text-white font-medium">{option}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}</div>
                  <div className="mt-8 flex justify-end">
                    <Button onClick={handleNextQuestion} className="btn-primary" disabled={selectedAnswer === ''}>
                      {currentQuestion === exam.questions.length - 1 ? t('finishQuiz') : t('nextQuestion')}
                      <i className="fas fa-arrow-right w-4 h-4 ml-2"></i>
                    </Button>
                  </div>
                </CardContent></Card>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default ExamPage;