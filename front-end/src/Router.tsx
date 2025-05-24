import { Routes, Route } from 'react-router-dom';

import { Welcome } from './pages/Welcome';
import { HowAreYou } from './pages/register/HowAreYou';
import { AboutYou } from './pages/register/AboutYou';
import { Adress } from './pages/register/Adress';
import { AdoptionResearch } from './pages/register/AdoptionResearch';
import { Preference } from './pages/register/Preference';
import { Credentials } from './pages/register/Credentials';
import { Organization } from './pages/register/Organization';
import { Match } from './pages/Match';
import { User } from './pages/User';
import { Saved } from './pages/Saved';
import { Requests } from './pages/Requests';
import { OngRequests } from './pages/OngRequests';
import { AboutThePet } from './pages/AboutThePet';
import { Pets } from './pages/Pets';
import { Finish } from './pages/register/Finish';
import { Ong } from './pages/Ong';
import { NewPet } from './pages/NewPet';
import { Chat } from './pages/Chat';

export function Router() {
    return (
        <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/register/howareyou" element={<HowAreYou />} />
            <Route path="/register/about" element={<AboutYou />} />
            <Route path="/register/address" element={<Adress />} />
            <Route path="/register/research" element={<AdoptionResearch />} />
            <Route path="/register/preference" element={<Preference />} />
            <Route path="/register/credentials" element={<Credentials />} />
            <Route path="/register/organization" element={<Organization />} />
            <Route path="/match" element={<Match />} />
            <Route path="/user" element={<User />} />
            <Route path="/saved" element={<Saved />} />
            <Route path="/requests" element={<Requests />} />
            <Route path="/about-the-pet" element={<AboutThePet />} />
            <Route path="/pets" element={<Pets />} />
            <Route path="/register/finish" element={<Finish />} />
            <Route path="/ong" element={<Ong />} />
            <Route path="/new-pet" element={<NewPet />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/ong-requests" element={<OngRequests />} />
        </Routes>
    );
}