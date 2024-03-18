import { validationResult } from 'express-validator';
import { body } from 'express-validator';

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return res.status(400).json({ message: errors.array()[0].msg });
};

export const validateLogin = [
  body('username').notEmpty().withMessage('유저네임은 필수 항목입니다.'),
  body('password')
    .notEmpty()
    .withMessage('패스워드는 필수 항목입니다.')
    .isLength({ min: 8 })
    .withMessage('최소 8자 이상이어야 합니다.'),
  // .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]+$/)
  // .withMessage('영문 대소문자, 숫자, 특수문자(@$!%*#?&)를 포함해야 합니다.'),
  validate,
];

// 회원가입
export const validateSignup = [
  ...validateLogin,
  body('name').notEmpty().withMessage('이름은 필수 항목입니다.'),
  body('email')
    .notEmpty()
    .withMessage('이메일은 필수 항목입니다.')
    .isEmail()
    .withMessage('유효한 이메일 형식이 아닙니다.'),
  body('url')
    .isURL() // url이 맞는지
    .optional({ nullable: true, checkFalsy: true }) // 데이터가 없거나, 빈 문자열 허용!
    .withMessage('유효한 URL 형식이 아닙니다.'),
  validate,
];
