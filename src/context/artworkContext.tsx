import React, { createContext, useContext, useState } from 'react';
import { ArtworkI } from 'src/types';

interface ArtworkContextProps {
  currentArtwork: ArtworkI | null;
  currentArtworkId: string | null;
  artworks: ArtworkI[];
  setCurrentArtwork: React.Dispatch<React.SetStateAction<ArtworkI | null>> | null;
  setCurrentArtworkId: React.Dispatch<React.SetStateAction<string | null>> | null;
  setArtworks: React.Dispatch<React.SetStateAction<ArtworkI[]>> | null;
  hoveredOwnerId: string | null;
  setHoveredOwnerId: React.Dispatch<React.SetStateAction<string | null>> | null;
}

const artworkContextInitialValue = {
  currentArtwork: null,
  currentArtworkId: null,
  artworks: [],
  setCurrentArtwork: null,
  setCurrentArtworkId: null,
  setArtworks: null,
  hoveredOwnerId: null,
  setHoveredOwnerId: null,
};

export const ArtworkContext = createContext<ArtworkContextProps>(artworkContextInitialValue);

export const useArtworkContext = () => useContext(ArtworkContext);

export const ArtworkContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentArtwork, setCurrentArtwork] = useState<ArtworkI | null>(null);
  const [currentArtworkId, setCurrentArtworkId] = useState<string | null>(null);
  const [hoveredOwnerId, setHoveredOwnerId] = useState<string | null>(null);
  const [artworks, setArtworks] = useState<ArtworkI[]>([]);
  const value = {
    currentArtwork,
    setCurrentArtwork,
    artworks,
    setArtworks,
    currentArtworkId,
    setCurrentArtworkId,
    hoveredOwnerId,
    setHoveredOwnerId,
  };
  return <ArtworkContext.Provider value={value}>{children}</ArtworkContext.Provider>;
};
