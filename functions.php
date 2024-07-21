<?php

if (!defined("is_development_environment")) {
    function is_development_environment()
    {
        return wp_get_environment_type() === "development";
    }

    add_action("init", "is_development_environment");
}

if (!defined("is_production_environment")) {
    function is_production_environment()
    {
        return wp_get_environment_type() === "production";
    }

    add_action("init", "is_production_environment");
}

if (!defined('version')) {
    define('version', wp_get_theme()->get('Version'));
}

if (is_production_environment() && !defined('manifest_json')) {
    define('manifest_json', json_decode(file_get_contents(get_template_directory() . '/assets/.vite/manifest.json'), true));
}

function load_scripts()
{
    if (is_production_environment()) {
        wp_enqueue_script('main', get_parent_theme_file_uri('assets/' . manifest_json['index.html']['file']), array(), version, true);

        wp_enqueue_style('main', get_parent_theme_file_uri('assets/' . manifest_json['index.html']['css']['0']), array(), version);
    }
}

add_action('wp_enqueue_scripts', 'load_scripts');

function add_type_attribute($tag, $handle, $src)
{
    if ("main.js" === $handle) {
        return '<script type="module" src="' . esc_url($src) . '"></script>';
    }
    return $tag;
}

add_filter('script_loader_tag', 'add_type_attribute', 10, 3);
