<?php

namespace Ubermanu\NavigationAsync\Plugin;

use Magento\Theme\Block\Html\Pager;

class PagerLinks
{
    /**
     * Inject the async script into the pager links, so the template doesn't have to be overridden.
     *
     * @param Pager $subject
     * @param $result
     * @return mixed|string
     */
    public function afterToHtml(Pager $subject, $result)
    {
        if (empty($result)) {
            return $result;
        }

        $config = [
            '#maincontent .pages a' => [
                'Ubermanu_NavigationAsync/js/link' => [
                    'history' => true,
                ]
            ]
        ];

        return $result . '<script type="text/x-magento-init">' . json_encode($config) . '</script>';
    }
}
