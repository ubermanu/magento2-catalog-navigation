<?php

namespace Ubermanu\NavigationAsync\Observer;

use Magento\Framework\App\RequestInterface;
use Magento\Framework\Event\Observer;
use Magento\Framework\Event\ObserverInterface;
use Magento\Framework\View\LayoutInterface;

class LayoutLoadContentOnly implements ObserverInterface
{
    /**
     * @var RequestInterface
     */
    protected $request;

    public function __construct(
        RequestInterface $request
    ) {
        $this->request = $request;
    }

    /**
     * If the request has the `isContent` parameter, we only load the content.
     * This kind of works like the `isAjax` parameter, but with a layout update handle.
     *
     * @inheritDoc
     */
    public function execute(Observer $observer)
    {
        $isContent = $this->request->getParam('isContent', false);

        /** @var LayoutInterface $layout */
        $layout = $observer->getLayout();

        if ($layout && $isContent) {
            $layout->getUpdate()->addHandle('navigation_async_content');
        }
    }
}
