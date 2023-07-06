export interface ColorsRoot {
  default: Default;
  background: Background;
  text: Text;
  transparent: Transparent;
  white: White;
  black: Black;
  primary: Primary;
  secondary: Secondary;
  info: Info;
  success: Success;
  warning: Warning;
  error: Error;
  light: Light;
  dark: Dark;
  grey: Grey;
  gradients: Gradients;
  socialMediaColors: SocialMediaColors;
  alertColors: AlertColors;
  badgeColors: BadgeColors;
  inputColors: InputColors;
  sliderColors: SliderColors;
  circleSliderColors: CircleSliderColors;
  tabs: Tabs;
}

export interface Background {
  default: string;
  main: string;
}

export interface Text {
  primary: string;
  main: string;
}

export interface Default {
  main: string;
}

export interface Transparent {
  main: string;
}

export interface White {
  main: string;
  focus: string;
}

export interface Black {
  light: string;
  main: string;
  focus: string;
}

export interface Primary {
  main: string;
  focus: string;
}

export interface Secondary {
  main: string;
  focus: string;
}

export interface Info {
  main: string;
  focus: string;
}

export interface Success {
  main: string;
  focus: string;
}

export interface Warning {
  main: string;
  focus: string;
}

export interface Error {
  main: string;
  focus: string;
}

export interface Light {
  main: string;
  focus: string;
}

export interface Dark {
  main: string;
  focus: string;
}

export interface Grey {
  '100': string;
  '200': string;
  '300': string;
  '400': string;
  '500': string;
  '600': string;
  '700': string;
  '800': string;
  '900': string;
}

export interface Gradients {
  primary: Primary2;
  secondary: Secondary2;
  info: Info2;
  success: Success2;
  warning: Warning2;
  error: Error2;
  light: Light2;
  dark: Dark2;
}

export interface Primary2 {
  main: string;
  state: string;
}

export interface Secondary2 {
  main: string;
  state: string;
}

export interface Info2 {
  main: string;
  state: string;
}

export interface Success2 {
  main: string;
  state: string;
}

export interface Warning2 {
  main: string;
  state: string;
}

export interface Error2 {
  main: string;
  state: string;
}

export interface Light2 {
  main: string;
  state: string;
}

export interface Dark2 {
  main: string;
  state: string;
}

export interface SocialMediaColors {
  facebook: Facebook;
  twitter: Twitter;
  instagram: Instagram;
  linkedin: Linkedin;
  pinterest: Pinterest;
  youtube: Youtube;
  vimeo: Vimeo;
  slack: Slack;
  dribbble: Dribbble;
  github: Github;
  reddit: Reddit;
  tumblr: Tumblr;
}

export interface Facebook {
  main: string;
  dark: string;
}

export interface Twitter {
  main: string;
  dark: string;
}

export interface Instagram {
  main: string;
  dark: string;
}

export interface Linkedin {
  main: string;
  dark: string;
}

export interface Pinterest {
  main: string;
  dark: string;
}

export interface Youtube {
  main: string;
  dark: string;
}

export interface Vimeo {
  main: string;
  dark: string;
}

export interface Slack {
  main: string;
  dark: string;
}

export interface Dribbble {
  main: string;
  dark: string;
}

export interface Github {
  main: string;
  dark: string;
}

export interface Reddit {
  main: string;
  dark: string;
}

export interface Tumblr {
  main: string;
  dark: string;
}

export interface AlertColors {
  primary: Primary3;
  secondary: Secondary3;
  info: Info3;
  success: Success3;
  warning: Warning3;
  error: Error3;
  light: Light3;
  dark: Dark3;
}

export interface Primary3 {
  main: string;
  state: string;
  border: string;
}

export interface Secondary3 {
  main: string;
  state: string;
  border: string;
}

export interface Info3 {
  main: string;
  state: string;
  border: string;
}

export interface Success3 {
  main: string;
  state: string;
  border: string;
}

export interface Warning3 {
  main: string;
  state: string;
  border: string;
}

export interface Error3 {
  main: string;
  state: string;
  border: string;
}

export interface Light3 {
  main: string;
  state: string;
  border: string;
}

export interface Dark3 {
  main: string;
  state: string;
  border: string;
}

export interface BadgeColors {
  primary: Primary4;
  secondary: Secondary4;
  info: Info4;
  success: Success4;
  warning: Warning4;
  error: Error4;
  light: Light4;
  dark: Dark4;
}

export interface Primary4 {
  background: string;
  text: string;
}

export interface Secondary4 {
  background: string;
  text: string;
}

export interface Info4 {
  background: string;
  text: string;
}

export interface Success4 {
  background: string;
  text: string;
}

export interface Warning4 {
  background: string;
  text: string;
}

export interface Error4 {
  background: string;
  text: string;
}

export interface Light4 {
  background: string;
  text: string;
}

export interface Dark4 {
  background: string;
  text: string;
}

export interface InputColors {
  borderColor: BorderColor;
  boxShadow: string;
  error: string;
  success: string;
}

export interface BorderColor {
  main: string;
  focus: string;
}

export interface SliderColors {
  thumb: Thumb;
}

export interface Thumb {
  borderColor: string;
}

export interface CircleSliderColors {
  background: string;
}

export interface Tabs {
  indicator: Indicator;
}

export interface Indicator {
  boxShadow: string;
}
