import { TextInputProps, TouchableOpacityProps } from "react-native";

declare interface ButtonProps extends TouchableOpacityProps {
  title: string;
  bgVariant?: "primary" | "secondary" | "danger" | "outline" | "success";
  textVariant?: "primary" | "default" | "secondary" | "danger" | "success";
  IconLeft?: React.ComponentType<any>;
  IconRight?: React.ComponentType<any>;
  className?: string;
}
declare interface InputFieldProps extends TextInputProps {
  label: string;
  icon?: any;
  secureTextEntry?: boolean;
  labelStyle?: string;
  containerStyle?: string;
  inputStyle?: string;
  iconStyle?: string;
  className?: string;
}

interface Member {
  _id: string;
  fullName: string;
  memberID: string;
}

interface Subscription {
  notes: string;
  _id: string;
  member: Member;
  depositeDate: string;
  depositeMonth: string;
  depositeYear: string;
  monthlyFee: number;
  status: string;
}

interface SubscriptionResponse {
  success: boolean;
  data: Subscription[];
}
