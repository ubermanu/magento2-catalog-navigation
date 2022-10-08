<?php

namespace Ubermanu\NavigationAsync\Plugin;

use Magento\Catalog\Block\Navigation;

class CatalogNavigationLinks
{
    /**
     * Inject the async script into the catalog navigation, so the template doesn't have to be overridden.
     *
     * @param Navigation $subject
     * @param $result
     * @return mixed|string
     */
    public function afterToHtml(Navigation $subject, $result)
    {
        if (empty($result)) {
            return $result;
        }

        $config = [
            '#maincontent .block.filter a' => [
                'Ubermanu_NavigationAsync/js/link' => [
                    'history' => true,
                ]
            ]
        ];

        return $result . '<script type="text/x-magento-init">' . json_encode($config) . '</script>';
    }
}
