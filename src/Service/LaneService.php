<?php

namespace App\Service;

use App\Entity\Card;
use App\Entity\Lane;
use Doctrine\ORM\EntityManagerInterface;
use App\Repository\CardRepository;
use App\Repository\LaneRepository;

class LaneService
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
     * @var EntityManagerInterface
     */
    private $em;

    public function __construct(
        CardRepository $cardRepository,
        LaneRepository $laneRepository,
        EntityManagerInterface $em
    ) {
        $this->cardRepository = $cardRepository;
        $this->laneRepository = $laneRepository;
        $this->em = $em;
    }

    public function saveLanes($data)
    {
        $this->resetLanes();

        $lanes = $data['total']['lanes'];
        $editedCard = $data['editedCard'];

        foreach ($lanes as $lane) {
            $laneDB = new Lane();
            $laneDB->setTitle($lane['title']);

            $this->em->persist($laneDB);
            $this->em->flush();

            $savedLane = $this->laneRepository->findOneBy(['title' => $lane['title']]);

            foreach ($lane['cards'] as $card) {
                if($card['id'] == $editedCard['id']) {
                    $this->saveCardForLane($editedCard, $savedLane);
                } else {
                    $this->saveCardForLane($card, $savedLane);
                }
            }
        }
    }

    public function resetLanes()
    {
        $cards = $this->cardRepository->findAll();
        $lanes = $this->laneRepository->findAll();

        foreach ($cards as $card) {
            $this->em->remove($card);
        }

        foreach ($lanes as $lane) {
            $this->em->remove($lane);
        }

        $this->em->flush();
    }

    public function saveCardForLane($data, $lane)
    {
        $d = $data;
        $card = new Card();

        $card
            ->setTitle(($d['title'] ?? ''))
            ->setDescription(($d['description'] ?? ''))
            ->setExpired(($d['expired'] ?? ''))
            ->setLane(
                $lane
            );

        $this->em->persist($card);
        $this->em->flush();
    }
}