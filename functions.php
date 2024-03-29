<?php
/**
* CPA functions and definitions
*
* @link https://developer.wordpress.org/themes/basics/theme-functions/
*
* @package CPA
* @since CPA 1.0
*/

/**
* Register block styles.
*/

if ( ! function_exists( 'cpa_block_styles' ) ) :
	/**
	* Register custom block styles
	*
	* @since CPA 1.0
	* @return void
	*/
	
	
	
	function cpa_block_styles() {
		
		register_block_style(
			'core/details',
			array(
				'name'         => 'arrow-icon-details',
				'label'        => __( 'Arrow icon', 'cpa' ),
				/*
				* Styles for the custom Arrow icon style of the Details block
				*/
				'inline_style' => '
				.is-style-arrow-icon-details {
					padding-top: var(--wp--preset--spacing--10);
					padding-bottom: var(--wp--preset--spacing--10);
				}
				
				.is-style-arrow-icon-details summary {
					list-style-type: "\2193\00a0\00a0\00a0";
				}
				
				.is-style-arrow-icon-details[open]>summary {
					list-style-type: "\2192\00a0\00a0\00a0";
				}',
				)
			);
			register_block_style(
				'core/post-terms',
				array(
					'name'         => 'pill',
					'label'        => __( 'Pill', 'cpa' ),
					/*
					* Styles variation for post terms
					* https://github.com/WordPress/gutenberg/issues/24956
					*/
					'inline_style' => '
					.is-style-pill a,
					.is-style-pill span:not([class], [data-rich-text-placeholder]) {
						display: inline-block;
						background-color: var(--wp--preset--color--base-2);
						padding: 0.375rem 0.875rem;
						border-radius: var(--wp--preset--spacing--20);
					}
					
					.is-style-pill a:hover {
						background-color: var(--wp--preset--color--contrast-3);
					}',
					)
				);
				register_block_style(
					'core/list',
					array(
						'name'         => 'checkmark-list',
						'label'        => __( 'Checkmark', 'cpa' ),
						/*
						* Styles for the custom checkmark list block style
						* https://github.com/WordPress/gutenberg/issues/51480
						*/
						'inline_style' => '
						ul.is-style-checkmark-list {
							list-style-type: "\2713";
						}
						
						ul.is-style-checkmark-list li {
							padding-inline-start: 1ch;
						}',
						)
					);
					register_block_style(
						'core/navigation-link',
						array(
							'name'         => 'arrow-link',
							'label'        => __( 'With arrow', 'cpa' ),
							/*
							* Styles for the custom arrow nav link block style
							*/
							'inline_style' => '
							.is-style-arrow-link .wp-block-navigation-item__label:after {
								content: "\2197";
								padding-inline-start: 0.25rem;
								vertical-align: middle;
								text-decoration: none;
								display: inline-block;
							}',
							)
						);
						register_block_style(
							'core/heading',
							array(
								'name'         => 'asterisk',
								'label'        => __( 'With asterisk', 'cpa' ),
								'inline_style' => "
								.is-style-asterisk:before {
									content: '';
									width: 1.5rem;
									height: 3rem;
									background: var(--wp--preset--color--contrast-2, currentColor);
									clip-path: path('M11.93.684v8.039l5.633-5.633 1.216 1.23-5.66 5.66h8.04v1.737H13.2l5.701 5.701-1.23 1.23-5.742-5.742V21h-1.737v-8.094l-5.77 5.77-1.23-1.217 5.743-5.742H.842V9.98h8.162l-5.701-5.7 1.23-1.231 5.66 5.66V.684h1.737Z');
									display: block;
								}
								
								/* Hide the asterisk if the heading has no content, to avoid using empty headings to display the asterisk only, which is an A11Y issue */
								.is-style-asterisk:empty:before {
									content: none;
								}
								
								.is-style-asterisk:-moz-only-whitespace:before {
									content: none;
								}
								
								.is-style-asterisk.has-text-align-center:before {
									margin: 0 auto;
								}
								
								.is-style-asterisk.has-text-align-right:before {
									margin-left: auto;
								}
								
								.rtl .is-style-asterisk.has-text-align-left:before {
									margin-right: auto;
								}",
								)
							);
						}
					endif;
					
					add_action( 'init', 'cpa_block_styles' );
					
					/**
					* Enqueue block stylesheets.
					*/
					
					if ( ! function_exists( 'cpa_block_stylesheets' ) ) :
						/**
						* Enqueue custom block stylesheets
						*
						* @since CPA 1.0
						* @return void
						*/
						function cpa_block_stylesheets() {
							/**
							* The wp_enqueue_block_style() function allows us to enqueue a stylesheet
							* for a specific block. These will only get loaded when the block is rendered
							* (both in the editor and on the front end), improving performance
							* and reducing the amount of data requested by visitors.
							*
							* See https://make.wordpress.org/core/2021/12/15/using-multiple-stylesheets-per-block/ for more info.
							*/
							wp_enqueue_block_style(
								'core/button',
								array(
									'handle' => 'cpa-button-style-outline',
									'src'    => get_parent_theme_file_uri( 'assets/css/button-outline.css' ),
									'ver'    => wp_get_theme( get_template() )->get( 'Version' ),
									'path'   => get_parent_theme_file_path( 'assets/css/button-outline.css' ),
									)
								);
							}
						endif;
						
						add_action( 'init', 'cpa_block_stylesheets' );
						
						/**
						* Register pattern categories.
						*/
						
						if ( ! function_exists( 'cpa_pattern_categories' ) ) :
							/**
							* Register pattern categories
							*
							* @since CPA 1.0
							* @return void
							*/
							
							$GLOBALS['current_section'] = '';
							
							// Set the current section to 'header' before the header is output
							add_action('get_header', function() {
								$GLOBALS['current_section'] = 'header';
								// var_dump("header");
							});
							
							// Set the current section to 'footer' before the footer is output
							add_action('get_footer', function() {
								$GLOBALS['current_section'] = 'footer';
								// var_dump("footer");
							});
							
							function cpa_pattern_categories() {
								
								register_block_pattern_category(
									'page',
									array(
										'label'       => _x( 'Pages', 'Block pattern category' ),
										'description' => __( 'A collection of full page layouts.' ),
										)
									);
								}
							endif;
							
							add_filter( 'get_custom_logo', 'cpa_polylang_logo' );
							function cpa_polylang_logo() {
								if ( function_exists( 'pll_current_language' ) ) {
									if (!isset($GLOBALS['logo_rendered'])) {
										$GLOBALS['logo_rendered'] = false;
									}
									$is_header = !$GLOBALS['logo_rendered'];
									$logos = array(
										'en' => $is_header ? 'LOGO_EN.svg': 'LOGO_EN_REVERSE.svg',
										'fr' => $is_header ? 'LOGO_FR.svg': 'LOGO_FR_REVERSE.svg',
									);
									$current_lang = pll_current_language();
									$img_path = get_stylesheet_directory_uri() . '/assets/images/';
									if ( isset( $logos[ $current_lang ] ) ) {
										$logo_url = $img_path . $logos[$current_lang];
									} else {
										$logo_url = $img_path . $logos['en'];
									}
									if ($current_lang	== 'en') {
										$alt_tag = 'CPA Professional Liability Plan Inc.';
										$logo_width = "211";
										$logo_height = "56";
									} else {
										$alt_tag = 'Régime Collectif d’Assurance Responsabilité Professionnelle des CPA Inc.';
										$logo_width = "231";
										$logo_height = "45";
									}
									$home_url = home_url();
									$html = sprintf( '<div class="wp-block-site-logo"><a href="%1$s" class="custom-logo-link" rel="home" aria-current="page"><img width="%2$s" height="%3$s" src="%4$s" class="custom-logo" alt="%5$s" decoding="async"></a></div>', esc_url( $home_url ), $logo_width, $logo_height, $logo_url, $alt_tag);
								}
								$GLOBALS['logo_rendered'] = true;
								
								return $html;   
							}
							
							
							
							// Function to enqueue CSS
							if ( !function_exists( 'theme_css' ) ):
								function theme_css() {
									wp_enqueue_style( 'theme_cfg_css', trailingslashit( get_stylesheet_directory_uri() ) . 'build/style-index.css', array(), filemtime( get_stylesheet_directory() . '/build/style-index.css' ) );
								}
							endif;
							
							// Function to enqueue JavaScript
							if ( !function_exists( 'theme_js' ) ):
								function theme_js() {
									wp_enqueue_script( 'theme_cfg_js', trailingslashit( get_stylesheet_directory_uri() ) . 'build/index.js', array(), filemtime( get_stylesheet_directory() . '/build/index.js' ), true );
								}
							endif;
							
							// Enqueue CSS and JS in the front end
							add_action( 'wp_enqueue_scripts', 'theme_css', 10 );
							add_action( 'wp_enqueue_scripts', 'theme_js', 10 );
							
							// Enqueue CSS in the block editor
							add_action( 'enqueue_block_editor_assets', 'theme_css' );
							
							// Exclude certain directories from AI1WM (All-in-One WP Migration) export
							add_filter('ai1wm_exclude_content_from_export', function($exclude_filters) {
								$exclude_filters[] = 'plugins/*/node_modules';
								$exclude_filters[] = 'cpa/node_modules';
								return $exclude_filters;
							});
							
							add_filter( 'ai1wm_exclude_themes_from_export', function ( $exclude_filters ) {
								$exclude_filters[] = 'ohja/node_modules';
								return $exclude_filters;
							} );
							
							
							// ACF CUSTOM POST TYPES
							
							add_action('acf/init', 'my_acf_init_block_types');
							function my_acf_init_block_types() {
								// Check function exists.
								if( function_exists('acf_register_block_type') ) {
									// register a testimonial block.
									
									acf_register_block_type( array(
										'name'              => 'conditional-archive-sidebar',
										'title'             => __('Conditional Archive Sidebar'),
										'description'       => __('Shows sidebar depending on post type (news or article).'),
										'render_template'	=> 'blocks/conditional-archive-sidebar/conditional-archive-sidebar.php',
										'mode'			=> 'preview',
										'supports'		=> [
											'align'			=> false,
											'anchor'		=> true,
											'customClassName'	=> true,
											'jsx' 			=> true,
										],
										'keywords'          => array( 'conditional', 'archive', 'sidebar' )
									));
									
									acf_register_block_type( array(
										'name'              => 'alert-banner',
										'title'             => __('Alert Banner'),
										'description'       => __('Alert Banner'),
										'render_template'   => 'blocks/alert-banner/alert-banner.php',
										'category'          => 'formatting',
										'icon'              => 'editor-ul',
										'keywords'          => array( 'alert', 'banner' )
										)
									);
								}
							}
							
							function render_category_block( $atts ) {
								// Get the current post
								$post = get_post();
								if ($post->post_type !== 'post') { return; }
								// Get the categories of the current post
								$categories = get_the_category( $post->ID );
								
								// Define the category colors and foreground colors
								$category_colors = array(
									'article' => array('bg' => 'var(--wp--preset--color--contrast-2)', 'fg' => 'white'),
									'report' => array('bg' => 'var(--wp--preset--color--contrast-3)', 'fg' => 'white'),
									'default' => array('bg' => 'var(--wp--preset--color--contrast)', 'fg' => 'white')
								);
								
								$translation_table = array(
									'en' => array(
										'Article' => 'Article',
										'Report' => 'Report',
										// Add more translations as needed
									),
									'fr' => array(
										'Article' => 'Article',
										'Report' => 'Rapport',
										// Add more translations as needed
									),
								);
								if ( ! empty( $categories ) ) {
									$category_name_orig = $categories[0]->name ? :	'';
									$category_name = strtolower($category_name_orig);
									$category_colors = isset($category_colors[$category_name]) ? $category_colors[$category_name] : $category_colors['default'];
									$category_link = get_category_link( $categories[0]->term_id );
									
									if (function_exists('pll_current_language')) {
										$current_language = pll_current_language();
										if (isset($translation_table[$current_language][$category_name_orig])) {
											$category_name = $translation_table[$current_language][$category_name_orig];
										}
									}
									return sprintf(
										'<button style="background-color: %s; color: %s;" aria-label="Category: %s">%s</button>',
										$category_colors['bg'],
										$category_colors['fg'],
										esc_attr($category_name_orig),
										esc_html($category_name_orig)
									);
								} else {
									$category_colors = $category_colors['default'];
									$category_link = '#';
								}
								
								// Return the block's HTML with the category color, foreground color and link
							}
							
							add_shortcode('category_block', 'render_category_block');
							
							remove_filter('the_content', 'wpautop');
							add_filter('the_content', 'wpautop', 99);
							add_filter('the_content', 'shortcode_unautop', 100);
							
							// Trim excerpts to 20 words
							add_filter( 'excerpt_length', function() { return 40; }, 999 );
							
							
							// ***
							// Swap language template part block START
							// ***
							
							function register_dynamic_template_part_block() {
								register_block_type('swd/template-part-swap-language', array(
									'attributes' => array(
										'slug' => array(
											'type' => 'string',
										),
										'area' => array(
											'type' => 'string',
										),
										'tagName' => array(
											'type' => 'string',
										),
									),
									'render_callback' => 'render_dynamic_template_part_block',
								));
							}
							add_action('init', 'register_dynamic_template_part_block');
							function render_dynamic_template_part_block($attributes, $content) {
								$slug = $attributes['slug'];
								$area = $attributes['area'];
								$tagName = $attributes['tagName'];
								
								// If the current language is French, append '-vf' to the slug
								if (function_exists('pll_current_language') && pll_current_language() === 'fr') {
									$slug .= '-fr';
								}
								
								// Create the template part block with the modified slug
								$block = array(
									'blockName' => 'core/template-part',
									'attrs' => array(
										'slug' => $slug,
										'area' => $area,
										'tagName' => $tagName,
									),
								);
								
								return render_block($block);
							}
							function my_theme_enqueue_block_editor_assets() {
								wp_enqueue_script(
									'swd-template-part-swap-language',
									get_stylesheet_directory_uri() . '/assets/scripts/swap-language.js',
									array('wp-blocks', 'wp-element'),
									true
								);
							}
							add_action('enqueue_block_editor_assets', 'my_theme_enqueue_block_editor_assets');
							
							// ***
							// Swap language template part block END
							// ***
							
							function change_wpforms_send_to_email($fields, $entry, $form_data) {
								$outputSelectorValue = $form_data['id'] == 2818;
								// Check if this is the form you want to change
								if ($form_data['id'] == '2818') {
									error_log(var_export($outputSelectorValue,true));
									$targetfield_name = 'Output Selector';
									$valuereference_arr = [
										'First Choice' => 'mailtest9@sidewaysdesign.com', 
										'Second Choice' => 'mailtest10@sidewaysdesign.com', 
										'Third Choice' => 'mailtest11@sidewaysdesign.com'
									];
									// loop through all fields and find the one with the name 'Output Selector'
									foreach ($fields as $field) {
										if ($field['name'] === $targetfield_name) {
											$outputSelectorValue = $field['value_raw'];
											break;
										}
									}
									
									// Change the "send to" email address if the output selector value matches one of the choices
									if (isset($valuereference_arr[$outputSelectorValue])) {
										$form_data['settings']['notifications'][1]['email'] = $valuereference_arr[$outputSelectorValue];
										$form_data['settings']['notifications'][1]['sender_address'] = $valuereference_arr[$outputSelectorValue];
									}
								}
								return $form_data;
							}
							add_filter('wpforms_process', 'change_wpforms_send_to_email', 10, 3);
							
							
add_action('pre_get_posts', 'filter_query_language');

function filter_query_language($query) {
    if (!is_admin() && $query->is_main_query() && function_exists('pll_current_language')) {
        $current_language = pll_current_language();
        $query->set('lang', $current_language);
    }
}



							
							?>