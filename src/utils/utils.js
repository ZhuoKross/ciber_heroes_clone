export default function MusicControls(k){
   const musicController =  {
        music: null,
        isPlaying: false,
        playMusic (){
            if(!this.isPlaying){
                this.music = k.play("level_01_back_sound")
                this.isPlaying = true;
            }
        },

        stopMusic(){
            if(this.isPlaying){
                this.music.paused = !this.music.paused;
                this.isPlaying = false;
            }
        }
    }



    return musicController;
}