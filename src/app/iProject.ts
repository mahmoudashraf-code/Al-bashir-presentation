export interface iProject {
    select: number;
    setting: iSettingProject;
    slides: iSlide[];
}
interface iSettingProject {
    color: string;
    background: string;
    theme?: string
}
export interface iSlide {
    slide: slideData[];
    temp?: slideData[];
}
interface slideData {
    type: string;
    value?: any;
}