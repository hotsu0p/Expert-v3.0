// Thank you Taksumaki for helping me with typescript! //
// https://gitlab.com/taksumaki //

declare module "akaneko" {
  /**
   * Returns Safe for Work Neko Images!
   * @returns image uri
   */
  export function neko(): Promise<String>;

  /**
   * Returns you lewd ... and dirty ... Neko Images !
   * @returns image uri
   */
  export function lewdNeko(): Promise<String>;

  /**
   * Images provided by @LamkasDev !~
   * Returns Safe for Work Foxgirl Images! Thanks @LamkasDev!
   * @returns image uri
   */
  export function foxgirl(): Promise<String>;

  /**
   * Returns Sends a bomb of random images of N value!
   * Contributed by @HanBao#8443 !! Thank you so much !
   * @param total amount of lewds! :3
   * @returns image uri
   */
  export function lewdBomb(total: number): Promise<String>;

  /**
   * Returns you SFW Anime Wallpapers for Desktops !
   * @returns image uri
   */
  export function wallpapers(): Promise<String>;

  /**
   * Returns SFW Anime Wallpapers for Mobile Users !
   * @returns image uri
   */
  export function mobileWallpapers(): Promise<String>;

  /**
   * These methods get NSFW images (lewds).
   */
  namespace nsfw {
    /**
     * I know you like anime ass~ uwu
     * @returns image uri
     */
    export function ass(): Promise<String>;

    /**
     * If you don't know what it is, search it up
     * @returns image uri
     */
    export function bdsm(): Promise<String>;

    /**
     * Basically an image of a girl sucking on a sharp blade!
     * @returns image uri
     */
    export function blowjob(): Promise<String>;

    /**
     * Basically sticky white stuff that is usually milked from sharpies.
     * @returns image uri
     */
    export function cum(): Promise<String>;

    /**
     * Sends a random doujin page imageURL!
     * @returns image uri
     */
    export function doujin(): Promise<String>;

    /**
     * So you like smelly feet huh?
     * @returns image uri
     */
    export function feet(): Promise<String>;

    /**
     * Female Domination?
     * @returns image uri
     */
    export function femdom(): Promise<String>;

    /**
     * Girl's that are wannabe foxes, yes
     * @returns image uri
     */
    export function foxgirl(): Promise<String>;

    /**
     * Basically an animated image, so yes :3
     * @returns image uri
     */
    export function gifs(): Promise<String>;

    /**
     * Girls that wear glasses, uwu~
     * @returns image uri
     */
    export function glasses(): Promise<String>;

    /**
     * Sends a random vanilla hentai imageURL~
     * @returns image uri
     */
    export function hentai(): Promise<String>;

    /**
     * Wow, I won't even question your fetishes.
     * @returns image uri
     */
    export function netorare(): Promise<String>;

    /**
     * Maids, Maid Uniforms, etc, you know what maids are :3
     * @returns image uri
     */
    export function maid(): Promise<String>;

    /**
     * Solo Queue in CSGO!
     * @returns image uri
     */
    export function masturbation(): Promise<String>;

    /**
     * Group Lewd Acts
     */
    export function orgy(): Promise<String>;

    /**
     * I mean... just why? You like underwear?
     * @returns image uri
     */
    export function panties(): Promise<String>;

    /**
     * The genitals of a female, or a cat, you give the meaning.
     * @returns image uri
     */
    export function pussy(): Promise<String>;

    /**
     * School Uniforms!~ Yatta~!
     * @returns image uri
     */
    export function school(): Promise<String>;

    /**
     * I'm sorry but, why do they look like intestines?
     * @returns image uri
     */
    export function tentacles(): Promise<String>;

    /**
     * The top part of your legs, very hot, isn't it?
     * @returns image uri
     */
    export function thighs(): Promise<String>;

    /**
     * The one thing most of us can all agree to hate :)
     * @returns image uri
     */
    export function uglyBastard(): Promise<String>;

    /**
     * Military, Konbini, Work, Nurse Uniforms, etc!~ Sexy~
     * @returns image uri
     */
    export function uniform(): Promise<String>;

    /**
     * Girls on Girls, and Girl's only!<3
     * @returns image uri
     */
    export function yuri(): Promise<String>;

    /**
     * That one part of the flesh being squeeze in thigh-highs~<3
     * @returns image uri
     */
    export function zettaiRyouiki(): Promise<String>;

    /**
     * Returns a NSFW mobile wallpaper.
     * @returns image uri
     */
    export function mobileWallpapers(): Promise<String>;

    /**
     * Returns a NSFW wallpaper.
     * @returns image uri
     */
    export function wallpapers(): Promise<String>;

    /**
     * Spooky Succubus, oh I'm so scared~ Totally don't suck me~
     * @returns image uri
     */
    export function succubus(): Promise<String>;
  }
}
