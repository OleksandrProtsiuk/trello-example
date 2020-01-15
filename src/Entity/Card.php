<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\CardRepository")
 */
class Card
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $title;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $description;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $expired;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Lane", inversedBy="card")
     */
    private $lane;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(?string $title): self
    {
        $this->title = $title;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getExpired(): ?string
    {
        return $this->expired;
    }

    public function setExpired(?string $expired): self
    {
        $this->expired = $expired;

        return $this;
    }

    public function getLane(): ?Lane
    {
        return $this->lane;
    }

    public function setLane(?Lane $lane): self
    {
        $this->lane = $lane;

        return $this;
    }
}
