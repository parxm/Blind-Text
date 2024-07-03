import React from 'react';
import { Html, Head, Text } from '@react-email/components';

interface VerificationEmailProps {
  otp: string;
}

const VerificationEmail = ({ otp }: VerificationEmailProps) => (
  <Html lang="en" dir="ltr">
    <Head>
      <title>Verification Code</title>
    </Head>
    <Text>Your verification code is: {otp}</Text>
  </Html>
);

export default VerificationEmail;
