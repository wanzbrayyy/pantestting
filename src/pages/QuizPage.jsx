import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import BackButton from '@/components/BackButton';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useLanguage } from '@/contexts/LanguageContext';
import QuizTimer from '@/components/QuizTimer';
import VideoPlayer from '@/components/VideoPlayer';
import { useQuizzesStorage } from '@/hooks/useLocalStorage';

const QuizPage = () => {
  const { quizId } = useParams();
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useQuizzesStorage();
  
  const [quiz, setQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [answers, setAnswers] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    if (quizzes.length === 0) {
      const demoQuizzes = [
        {
          id: 1,
          courseId: 1,
          title: { en: 'JavaScript Fundamentals Quiz', id: 'Kuis Dasar JavaScript', ja: 'JavaScript基礎クイズ' },
          questions: Array.from({ length: 15 }, (_, i) => ({
            id: i + 1,
            question: {
              en: `Question ${i + 1}: What is the output of console.log(typeof ${i})?`,
              id: `Pertanyaan ${i + 1}: Apa output dari console.log(typeof ${i})?`,
              ja: `質問${i + 1}: console.log(typeof ${i}) の出力は何ですか？`
            },
            options: {
              en: ['"number"', '"string"', '"object"', '"undefined"'],
              id: ['"number"', '"string"', '"object"', '"undefined"'],
              ja: ['"number"', '"string"', '"object"', '"undefined"']
            },
            correct: 0,
            videoUrl: i % 3 === 0 ? 'https://www.youtube.com/embed/s2skans2dP4' : null
          }))
        }
      ];
      setQuizzes(demoQuizzes);
    }
  }, [quizzes, setQuizzes]);

  useEffect(() => {
    const foundQuiz = quizzes.find(q => q.id.toString() === quizId);
    setQuiz(foundQuiz);
  }, [quizId, quizzes]);

  const handleFinishQuiz = () => {
    let correctAnswers = 0;
    const finalAnswers = selectedAnswer !== '' ? [...answers, selectedAnswer] : answers;
    
    finalAnswers.forEach((answer, index) => {
      if (answer === quiz.questions[index].correct) {
        correctAnswers++;
      }
    });

    const finalScore = Math.round((correctAnswers / quiz.questions.length) * 100);
    setScore(finalScore);
    setIsCompleted(true);
    toast({ title: t('quizCompleted'), description: `${t('yourScore')}: ${finalScore}%` });
    setTimeout(() => navigate(`/exam/${quiz.courseId}`), 2000);
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

    const currentQ = quiz.questions[currentQuestion];
    if (currentQ.videoUrl) {
      setShowVideo(true);
    } else {
      proceedToNext();
    }
  };

  const proceedToNext = () => {
    setShowVideo(false);
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleFinishQuiz();
    }
  };

  if (!quiz) {
    return <div className="min-h-screen flex items-center justify-center"><i className="fas fa-spinner fa-spin text-5xl text-white"></i></div>;
  }

  if (isCompleted) {
    return (
      <>
        <Helmet><title>Quiz Completed - Learning Platform</title></Helmet>
        <div className="min-h-screen flex items-center justify-center px-6 py-12"><LanguageSwitcher />
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="container mx-auto max-w-2xl text-center">
            <Card className="glass-effect border-white/20"><CardContent className="p-12">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3, type: "spring" }}><i className="fas fa-check-circle text-green-400 text-7xl mx-auto mb-6"></i></motion.div>
              <h1 className="text-4xl font-bold gradient-text mb-4">{t('quizCompleted')}</h1>
              <div className="text-6xl font-bold text-white mb-4">{score}%</div>
              <p className="text-xl text-gray-300 mb-8">Redirecting to final exam...</p>
              <i className="fas fa-spinner fa-spin text-3xl text-white"></i>
            </CardContent></Card>
          </motion.div>
        </div>
      </>
    );
  }

  if (showVideo) {
    return (
      <>
        <Helmet><title>Video Lesson - Learning Platform</title></Helmet>
        <div className="min-h-screen px-6 py-12"> <LanguageSwitcher />
          <div className="container mx-auto max-w-4xl"> <BackButton to={`/courses/${quiz.courseId}`} />
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
              <VideoPlayer videoUrl={quiz.questions[currentQuestion].videoUrl} title="Review Material"/>
              <div className="text-center mt-6">
                <Button onClick={proceedToNext} className="btn-primary"><i className="fas fa-arrow-right mr-2"></i>{currentQuestion < quiz.questions.length - 1 ? t('nextQuestion') : t('finishQuiz')}</Button>
              </div>
            </motion.div>
          </div>
        </div>
      </>
    );
  }

  const currentQ = quiz.questions[currentQuestion];
  return (
    <>
      <Helmet><title>{quiz.title[language]} - Learning Platform</title></Helmet>
      <div className="min-h-screen px-6 py-12"><LanguageSwitcher />
        <div className="container mx-auto max-w-4xl"> <BackButton to={`/courses/${quiz.courseId}`} />
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold gradient-text mb-2">{quiz.title[language]}</h1>
                <p className="text-gray-300">{t('question')} {currentQuestion + 1} of {quiz.questions.length}</p>
              </div>
              <QuizTimer initialTime={900} onTimeUp={handleFinishQuiz} />
            </div>
            <div className="mb-8"><div className="w-full bg-white/10 rounded-full h-2"><div className="progress-bar h-2" style={{ width: `${((currentQuestion + 1) / quiz.questions.length) * 100}%` }}></div></div></div>
            <AnimatePresence mode="wait">
              <motion.div key={currentQuestion} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.3 }}>
                <Card className="quiz-question-card"><CardContent>
                  <h2 className="text-2xl font-semibold text-white mb-8">{currentQ.question[language]}</h2>
                  <div className="space-y-4">{currentQ.options[language].map((option, index) => (
                    <motion.div key={index} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <div onClick={() => handleAnswerSelect(index)} className={`answer-option ${selectedAnswer === index ? 'selected' : ''}`}>
                        <div className="flex items-center space-x-3">
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${selectedAnswer === index ? 'border-blue-400 bg-blue-400' : 'border-gray-400'}`}>
                            {selectedAnswer === index && (<i className="fas fa-check text-white text-xs"></i>)}
                          </div><span className="text-white font-medium">{option}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}</div>
                  <div className="mt-8 flex justify-end">
                    <Button onClick={currentQuestion === quiz.questions.length - 1 ? handleFinishQuiz : handleNextQuestion} className="btn-primary" disabled={selectedAnswer === ''}>
                      {currentQuestion === quiz.questions.length - 1 ? t('finishQuiz') : t('nextQuestion')}
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

export default QuizPage;