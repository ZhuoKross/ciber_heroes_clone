import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import fondoLanding from "../public/assets/fondo_landing.jpg";
import players from "../public/assets/players.png";
import maps from "../public/assets/mapa_landing.png";
import city from "../public/assets/city.png";
import city2 from "../public/assets/cyberpunk-street.png";
import robot from "../public/assets/robot.png";
import { MapPin, Briefcase, Twitter, Github, Mail, Instagram } from 'lucide-react'


export default function landingPage() {
  const [isModalVisible, setIsModalVisible] = useState(true);

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <div className=" bg-[#0a0b1a]"> 
     {/* Modal */}
     {isModalVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg max-w-md text-center">
            <h2 className="text-2xl font-pixel  ">¡Advertencia!</h2>
            <img 
              src="assets/robotbb.gif"  
              className="mb-2 mx-auto w-40 h-auto animate-float"
            />
            <p className="text-sm mb-4">
              ¡Hola, querido héroe digital! Por ahora, CyberHeroes está disponible únicamente para jugar en computadoras.  
              ¡Te invitamos a disfrutar esta experiencia épica desde tu equipo de cómputo!
            </p>
            <button
              onClick={closeModal}
              className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-lg font-medium"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
      <nav className="bg-[#0a0b1a] border-gray-800 fixed top-0 left-0 right-0 mr-6 ml-6 mt-6 z-50 rounded-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-yellow-400 text-2xl font-pixel">CyberHeroes</span>
              </div>
            </div>
            <div className="hidden md:block">
          <div className="ml-10 flex items-center space-x-8">
            <a
              href="https://sensibilizacion.ciberpaz.gov.co/#/data-ciberpaz/response/64?type=public"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white px-4 py-2 text-sm font-bold rounded-md shadow-lg  duration-300 hover:scale-105 hover:shadow-xl"
            >
              ¡CiberPaz!
            </a>
            <Link
              to="/game"
              className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-md text-sm font-medium duration-300"
            >
              Iniciemos
            </Link>
          </div>
        </div>
          </div>
        </div>
      </nav>
    <div>

      {/* Hero Section */}
      <div 
        className="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${robot})` }}
      >
        <div className="text-center space-y-8 px-4 animate-float">
          <h1 className="text-6xl md:text-7xl font-pixel text-slate-950 leading-tight animate-pulse mb-80">
            ¡Bienvenido
            <br />
            CyberHeroes!
          </h1> 
          <Link 
          to="/game" 
          className="bg-yellow-400 w-64 hover:bg-yellow-500 text-black px-2 py-6 rounded-lg text-lg font-pixel hover:scale-105 m-[500px]"
        >
          ¡Iniciemos!
        </Link>
        </div>
      </div>
      <div className="min-h-screen bg-[#0a0b1a] flex items-center">
      <div className="container mx-auto px-4 animate-float">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left content */}
          <div className="max-w-xl ml-12">
            <h2 className="text-4xl md:text-5xl font-pixel text-white mb-6 leading-tight">
              ¡Conoce nuestro equipo!
            </h2>
            <p className="text-lg text-gray-300">
              Este es nuestro equipo llamado SENA - CSF DevXperts, los cuales te podemos ayudar durante tu travesía por esta aventura donde conoceras sobre ciberseguridad de una forma interactiva y divertida.
            </p>
          </div>

          {/* Right card */}
          <div className="relative"> 
            {/* Challenge Card */}
            <div className="bg-blue-400 rounded-xl p-1.5">
              <div className="bg-white rounded-lg p-4 space-y-4">
                {/* Card Header */}
                <div className="flex gap-2">
                  <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded text-sm font-medium">
                    SENA
                  </span>
                  <span className="bg-gray-100 text-gray-800 px-2 py-0.5 rounded text-sm font-medium">
                    Devs
                  </span>
                  <span className="ml-auto text-sm font-medium">
                    600XP
                  </span>
                </div>

                {/* Snake Image */}
                <div className="bg-blue-400 rounded-lg py-2 flex items-center justify-center">
                  <img 
                    src = {players}
                    alt="Devs ciber heroes devs" 
                    className="w-82 h-32 pixelated"
                  />
                </div>

                {/* Description */}
                <p className="text-sm">
                Actualmente trabajan en un proyecto enfocado en seguridad<br/>  informática y aprendizaje interactivo.
                </p>

                {/* Stats */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-purple-100 flex items-center justify-center">
                      <span className="text-purple-600 text-xs">✓</span>
                    </div>
                    <span className="text-sm"><b>6 Desarrolladores</b> en total.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-blue-400 flex items-center justify-center">
                      <span className="text-blue-400 text-xs">💻</span>
                    </div>
                    <span className="text-sm"> <b>2 Desarrolladores Frontend</b>: Especializados en interfaces <br/> interactivas y diseño accesible.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-blue-400 flex items-center justify-center">
                      <span className=" text-xs">⚙️</span>
                    </div>
                    <span className="text-sm"> <b>3 Desarrolladoras Backend</b>: Focalizadas en la creación de <br/>APIs y servicios escalables.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-blue-400 flex items-center justify-center">
                      <span className=" text-xs">🧠</span>
                    </div>
                    <span className="text-sm"><b>1 DevOps</b>: Responsable del despliegue y la infraestructura.</span>
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className=" bg-[#0a0b1a] flex items-center animate-float">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left card */}
          <div className="relative order-2 lg:order-1">

            {/* Challenge Card */}
            <div className="bg-lime-400 rounded-xl ml-8 p-1.5">
              <div className="bg-white rounded-lg p-4 space-y-4">
                {/* Card Header */}
                <div className="flex gap-2">
                  <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded text-sm font-medium">
                    Mapa
                  </span>
                  <span className="bg-gray-100 text-gray-800 px-2 py-0.5 rounded text-sm font-medium">
                    3 LVL
                  </span>
                  <span className="ml-auto text-sm font-medium">
                    30XP
                  </span>
                </div>

                {/* Snake Image */}
                <div className="bg-lime-400 rounded-lg p-4 flex items-center justify-center">
                  <img 
                   src = {maps}
                    alt="Python snake character" 
                    className="w-82 h-82 pixelated"
                  />
                </div>

                {/* Description */}
                <p className="text-sm">
                  Aqui puedes ver una pequeña muestra de nuestro mapa.
                </p>

                {/* Stats */}
                <div className="space-y-2">
                <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-yellow-100 flex items-center justify-center">
                      <span className=" text-xs">🗺️</span>
                    </div>
                    <span className="text-sm"><b>3 mapas</b>: Con objetos interactivos para el usuario.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-yellow-100 flex items-center justify-center">
                      <span className=" text-xs">👾</span>
                    </div>
                    <span className="text-sm"><b>9 Enemigos</b>: Los que intentaran robarte tu informacion <br/> y tendras que derrotarlos para impedirlo.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-yellow-100 flex items-center justify-center">
                      <span className=" text-xs">⏱️</span>
                    </div>
                    <span className="text-sm"><b>30 min</b>: Tiempo estimado para completar todos los tres niveles.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-yellow-100 flex items-center justify-center">
                      <span className=" text-xs">🎮</span>
                    </div>
                    <span className="text-sm"><b>3 niveles</b>: En los cuales se dividiran la dificultad.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right content */}
          <div className="max-w-xl order-1 lg:order-2">
            <h2 className="text-4xl md:text-5xl font-pixel text-white mb-6 leading-tight">
            ¡Explora nuevos horizontes!
            </h2>
            <p className="text-lg text-gray-300">
            ¿Estás listo para embarcarte en una aventura única? Tenemos 3 mapas llenos de misterios y objetos interactivos que harán que cada paso cuente. ¡No te pierdas la oportunidad de descubrir lo que hemos preparado para ti!
            </p>
          </div>
        </div>
      </div>
    </div>
    <div className='py-16 mt-16 px-6'>
    <hr>
    </hr>
    </div>
    <div className='text-center '>
        <span className='font-pixel text-4xl mt-32 text-white'>¿Qué te enseñaremos?</span>
    </div>
    <div>
      <p className="text-white text-center text-xl mt-10">
        Nuestro equipo, Sena DevXperts, busca potenciar la conciencia y preparación de los usuarios frente <br />
        a amenazas cibernéticas a través de CyberHeroes, un videojuego educativo que facilita el <br />
        aprendizaje práctico y el desarrollo de habilidades en ciberseguridad de forma dinámica y <br />
        envolvente. Este proyecto, alineado con la estrategia de Ciber Paz, promueve una cultura digital <br />
        segura, ética y responsable, fortaleciendo el conocimiento y la protección en línea.
      </p>
      <img 
        src="/assets/logoCyber.png"  
        className="mx-auto w-96 animate-float"
      />
    </div>
    <div className='py-4 px-6'>
    <hr>
    </hr>
    </div>
    <div className="min-h-screen bg-[#0a0b1a] flex items-center animate-float">
      <div className="container mx-auto px-4 mb-36">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          
          {/* Left content */}
          <div className="max-w-xl ml-12">
            <h2 className="text-4xl md:text-5xl font-pixel text-white mb-6 leading-tight">
              ¿Que solucion proponemos?
            </h2>
          </div>
          <div className="max-w-2xl mx-auto p-4">
        <div className="relative">

        {/* Name bubble */}
        <div className="absolute -top-4 left-4 bg-purple-200 px-4 py-1 rounded-full border-2 border-purple-300">
          <span className="font-mono text-purple-900">Devs</span>
        </div>

        {/* Main card */}
        <div className="bg-gradient-to-br from-purple-100 to-purple-200 p-6 pt-8 rounded-xl border-2 border-purple-300 shadow-lg">

          {/* Testimonial text */}
          <p className="font-mono text-purple-900 leading-relaxed mb-4 text-lg">
          CyberHeroes es un videojuego educativo diseñado para enseñar ciberseguridad de manera divertida y accesible para todos. Ambientado en un mundo de estilo pixel art, los jugadores asumen el rol de un Héroe que debe enfrentarse a monstruos representativos de diversas amenazas digitales que les harán preguntas sobre ciberseguridad en linea. </p>
          
          {/* Footer */}
          <div className="flex flex-wrap items-center gap-4 text-purple-800">
            <a 
              href="https://twitter.com/teejay"
              className="flex items-center gap-1 hover:text-purple-600 transition-colors"
            >
              <Twitter className="h-4 w-4" />
              <span className="font-mono">@CiberHeroes</span>
            </a>
            
            <div className="flex items-center gap-1">
              <Briefcase className="h-4 w-4" />
              <span className="font-mono">Sena Developer</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span className="font-mono">Bogota, COL</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    
        </div>
      </div>
    </div>
    <div className=" bg-[#0a0b1a] flex items-center">
      <div className="container mx-auto px-4 animate-float">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
        <div className="relative px-16">
        {/* Name bubble */}
        <div className="absolute -top-4 bg-cyan-100 px-4 py-1 rounded-full border-2 border-cyan-700">
          <span className="font-mono text-cyan-700">Devs</span>
        </div>
        {/* Main card */}
        <div className="bg-gradient-to-br from-cyan-100 to-cyan-100 p-6 pt-8 rounded-xl border-2 border-cyan-700 shadow-lg  ">
          {/* Testimonial text */}
          <p  className="font-mono text-cyan-700 leading-relaxed mb-4 text-lg ">
          Para encontrar mas contenido sobre sensibilizacion de ciber seguridad y muchos 
          temas mas puedes visitar la pagina oficial de ciber paz. <br/> <br/>o puedes dar clic aqui: 
          <a target="_blank" rel="noopener noreferrer" href='https://ciberpaz.gov.co/portal/'>CiberPaz</a> </p>          
          
          {/* Footer */}
          <div className="flex flex-wrap items-center gap-4 text-cyan-700">
            <a 
              href="https://twitter.com/teejay"
              className="flex items-center gap-1 hover:text-cyan-700 transition-colors"
            >
              <Twitter className="h-4 w-4" />
              <span className="font-mono">@CiberHeroes</span>
            </a>
            
            <div className="flex items-center gap-1">
              <Briefcase className="h-4 w-4" />
              <span className="font-mono">Sena Developer</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span className="font-mono">Bogota, COL</span>
            </div>
          </div>
        </div>
      </div>
          {/* Right content */}
          <div className="max-w-xl order-1 lg:order-2">
            <h2 className="text-4xl md:text-5xl font-pixel text-white mb-6 leading-tight">
            ¿Donde puedo encontrar mas contenido?
            </h2>
          </div>
        </div>
      </div>
    </div>
   {/* Partners Section */}
      <div className="bg-[#0a0b1a] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-400 text-sm mb-8 mt-32 uppercase tracking-wide">
            Nos encuentras aqui
          </p>
          <div className="flex justify-center text-white items-center space-x-12 opacity-75 animate-bounce">
            {/* Replace with actual partner logos */}
            <Github className="h-8 w-8" />
            <Mail className="h-8 w-8" />
            <Instagram className="h-8 w-8" />
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}