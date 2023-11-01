/**
 * Svg image metadata defination
 */
export interface SvgImage {
  /**
   * Key that determines which SVG file to render in the template
   */
  imageName: string;

  /**
   * SVG file path to render
   */
  imagePath: string;

  /**
   * SVG content
   */
  renderedContent: string;
}

export interface SvgImageConfig {
  /**
   * Holds all svg image definitions
   */
  iconImageFiles: SvgImage[];
}

export interface SvgImageOptions {
  /**
   * Path of json file with svg metadata definitions
   */
  path: string;
}
