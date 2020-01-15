<?php

namespace App\Service;

use Doctrine\ORM\EntityManagerInterface;
use App\Repository\CardRepository;
use App\Repository\LaneRepository;

class CardService
{
    /**
     * @var CardRepository
     */
    private $cardRepository;

    /**
     * @var LaneRepository
     */
    private $laneRepository;

    /**
     * @var LaneService
     */
    private $laneService;

    /**
     * @var EntityManagerInterface
     */
    private $em;

    public function __construct(
        CardRepository $cardRepository,
        LaneRepository $laneRepository,
        EntityManagerInterface $em,
        LaneService $laneService
    ) {
        $this->cardRepository = $cardRepository;
        $this->laneRepository = $laneRepository;
        $this->em = $em;
        $this->laneService = $laneService;
    }

    public function getCards()
    {
        $lanesArray =[];
        $lanes = $this->laneRepository->findAll();
        foreach ($lanes as $lane) {
            $c =[];
            foreach ($lane->getCard() as $card) {
                array_push($c, [
                    'id' => $card->getId() . '',
                    'title' => $card->getTitle(),
                    'description' => $card->getDescription(),
                    'expired' => $card->getExpired(),
                ]);
            }

            $l = [
                'id' => $lane->getId() . '',
                'title' => $lane->getTitle(),
                'cards' => $c,
            ];
            array_push($lanesArray, $l);
            unset($l);
        }

        return [
            'lanes' => $lanesArray,
            ];
    }
}