<?php

namespace App\Controller;

use App\Service\CardService;
use App\Service\LaneService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

/**
 * Api controller.
 * @Route("/api", name="api")
 */
class ApiController extends AbstractController
{
    /**
     * @var CardService
     */
    private $cardService;

    /**
     * @var LaneService
     */
    private $laneService;

    public function __construct(CardService $cardService, LaneService $laneService)
    {
        $this->cardService = $cardService;
        $this->laneService =$laneService;
    }

    /**
     * @Route("/cards", name="cards", methods={"GET"})
     * @return Response
     */
    public function index()
    {
        $response = new Response();
        $response->setContent(json_encode($this->cardService->getCards()));

        return $response;
    }

    /**
     * @Route("/lanes/reset", name="lanes", methods={"POST"})
     * @param Request $request
     * @return Response
     */
    public function resetLanes(Request $request) {
        $data = json_decode($request->getContent(), true);
        $this->laneService->saveLanes($data);

        $response = new Response();
        return $response->setContent(json_encode([]));
    }
}
