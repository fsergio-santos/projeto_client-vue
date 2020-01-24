<template>
    <div class="uploader"
        @dragenter="OnDragEnter"
        @dragleave="OnDragLeave"
        @dragover.prevent
        @drop="onDrop"
        :class="{ dragging: isDragging }">
        
        <!-- <div class="upload-control" v-show="images.length">
            <label for="file"><i class="fa fa-file"></i></label>
            <button @click="upload"><i class="fa fa-upload"></i></button>
        </div> -->


        <div v-show="!images.length">
            <i class="fa fa-cloud-upload up"></i>
            <!-- <p>Arraste sua imagem aqui!</p> -->
            <!-- <div>OR</div> -->
            <div class="file-input">
                <label for="file">Selecione o arquivo</label>
                <input type="file" id="file" @change="onInputChange" multiple>
            </div>
        </div>

        <div class="images-preview" v-show="images.length">
            <div class="img-wrapper" v-for="(image, index) in images" :key="index">
                <img :src="image" >
                <div class="details">
                    <!-- <span class="name" v-text="files[index].name"></span> -->
                    <!-- <span class="size" v-text="getFileSize(files[index].size)"></span> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data: () => ({
        isDragging: false,
        dragCount: 0,
        files: [],
        images: []
    }),
    methods: {
        OnDragEnter(e) {
            e.preventDefault();
            
            this.dragCount++;
            this.isDragging = true;

            return false;
        },
        OnDragLeave(e) {
            e.preventDefault();
            this.dragCount--;

            if (this.dragCount <= 0)
                this.isDragging = false;
        },
        onInputChange(e) {
            const files = e.target.files;

            Array.from(files).forEach(file => this.addImage(file));
        },
        onDrop(e) {
            e.preventDefault();
            e.stopPropagation();

            this.isDragging = false;

            const files = e.dataTransfer.files;

            Array.from(files).forEach(file => this.addImage(file));
        },
        addImage(file) {
            if (!file.type.match('image.*')) {
                this.$toastr.e(`${file.name} is not an image`);
                return;
            }

            this.files.push(file);

            // eslint-disable-next-line no-unused-vars
            const img = new Image(),
                reader = new FileReader();

            reader.onload = (e) => this.images.push(e.target.result);

            reader.readAsDataURL(file);
        },
        getFileSize(size) {
            const fSExt = ['Bytes', 'KB', 'MB', 'GB'];
            let i = 0;
            
            while(size > 900) {
                size /= 1024;
                i++;
            }

            return `${(Math.round(size * 100) / 100)} ${fSExt[i]}`;
        },
        upload() {
            const formData = new FormData();
            
            this.files.forEach(file => {
                formData.append('images[]', file, file.name);
            });

            /* axios.post('/images-upload', formData)
                .then(response => {
                    this.$toastr.s('All images uplaoded successfully');
                    this.images = [];
                    this.files = [];
                }) */
        }
    }
}
</script>

<style lang="scss" scoped>
.uploader {
    width: 85%;
    background: #2196F3;
    color: #fff;
    padding: 10px 4px;
    margin-left: 10px;
    margin-top: 5px;
    text-align: center;
    border-radius: 10px;
    border: 3px dashed #fff;
    font-size: 10px;
    //position: relative;
    height: 80%;

    &.dragging {
        background: #fff;
        color: #2196F3;
        border: 3px dashed #2196F3;

        .file-input label {
            background: #2196F3;
            color: #fff;
        }
    }

    .up {
        font-size: 70px;
    }

    .file-input {
        width:  100px;
        margin: auto;
        text-align: center;
        height: 68px;
        position: relative;
       
        label,
        input {
            background: #fff;
            color: #2196F3;
            width: 85%;
            position: absolute;
            left: 0;
            top: 0;
            padding: 5px;
            border-radius: 4px;
            //margin-top: 7px;
            cursor: pointer;
        }

        input {
            opacity: 0;
            z-index: -2;
        }
    }

    .images-preview {
        display: flex;
        //flex-wrap: wrap;
        margin-top: 0px;
    

        .img-wrapper {
            width: 200px;
            text-align: center;
            
   /*          display: flex;
            flex-direction: column; */
            //margin: 5px;
            //margin-top: 2px;
            //margin-left: 10px;
            //height: 100px;
            //justify-content: space-between;
            //background: #fff;
            //box-shadow: 5px 5px 20px #3e3737;

            img {
                max-height: 105px;
                display: block;
                margin-left: auto;
                margin-right: auto;
                width: 100%;
            }
        }

        /* .details {
            font-size: 12px;
            background: #fff;
            color: #000;
            display: flex;
            flex-direction: column;
            align-items: self-start;
            padding: 3px 6px;

            .name {
                overflow: hidden;
                height: 18px;
            }
        } */
    }

    /* .upload-control {
        position: absolute;
        width: 60%;
        //background: #fff;
        top: 27px;
        left: 50px;
        border-top-left-radius: 7px;
        border-top-right-radius: 7px;
        //padding: 25px;
        //padding-bottom: 4px;
        text-align: center; 

        button, label {
            background: #2196F3;
            border: 2px solid #03A9F4;
            border-radius: 3px;
            color: #fff;
            font-size: 15px;
            cursor: pointer;
        }

        label {
            padding: 2px 5px;
            margin-right: 10px;
        } 
    }*/
}
</style>